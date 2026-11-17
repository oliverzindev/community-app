/*
 * Tradução no servidor. DeepL se houver DEEPL_KEY (melhor PT-PT); senão MyMemory (grátis).
 * Cache em memória por instância. Nunca expõe chaves ao browser.
 */
import "server-only";

const cache = new Map<string, string>();
const CJK = /[㐀-鿿]/;

async function deepl(texts: string[], dir: "pt-zh" | "zh-pt", key: string): Promise<string[]> {
  const host = key.trim().endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  const [source, target] = dir === "pt-zh" ? ["PT", "ZH"] : ["ZH", "PT-PT"];
  const res = await fetch(`${host}/v2/translate`, {
    method: "POST",
    headers: { Authorization: `DeepL-Auth-Key ${key.trim()}`, "content-type": "application/json" },
    body: JSON.stringify({ text: texts, source_lang: source, target_lang: target })
  });
  if (!res.ok) throw new Error(`DeepL ${res.status}`);
  const data = await res.json();
  return (data.translations || []).map((t: any) => t.text);
}

async function myMemoryOne(text: string, dir: "pt-zh" | "zh-pt"): Promise<string | null> {
  const [source, target] = dir === "pt-zh" ? ["pt-PT", "zh-CN"] : ["zh-CN", "pt-PT"];
  const params = new URLSearchParams({ q: text.slice(0, 450), langpair: `${source}|${target}` });
  if (process.env.MYMEMORY_EMAIL) params.set("de", process.env.MYMEMORY_EMAIL);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?${params}`, { signal: controller.signal });
    const data = await res.json();
    const tr = data?.responseData?.translatedText;
    if (data?.responseStatus === 200 && typeof tr === "string" && !/MYMEMORY WARNING/i.test(tr)) return tr;
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function translateBatch(texts: string[], dir: "pt-zh" | "zh-pt"): Promise<(string | null)[]> {
  const key = process.env.DEEPL_KEY;
  if (key) {
    try {
      return await deepl(texts, dir, key);
    } catch {
      /* cai para o MyMemory */
    }
  }
  // MyMemory: sequencial com limite para não exceder a quota
  const out: (string | null)[] = [];
  for (const t of texts) out.push(await myMemoryOne(t, dir));
  return out;
}

/** Traduz a pesquisa PT→ZH. Se já estiver em chinês, devolve tal como está. */
export async function queryToChinese(q: string): Promise<string> {
  const text = q.trim();
  if (CJK.test(text)) return text;
  const ck = `q:${text}`;
  if (cache.has(ck)) return cache.get(ck)!;
  const [r] = await translateBatch([text], "pt-zh");
  const zh = (r || text).trim().replace(/[。.]$/, "");
  cache.set(ck, zh);
  return zh;
}

/** Traduz títulos ZH→PT (best-effort, com cache). Devolve mapa original→PT. */
export async function titlesToPt(titles: string[], max = 30): Promise<Record<string, string>> {
  const uniq = [...new Set(titles.filter(Boolean))].slice(0, max);
  const result: Record<string, string> = {};
  const todo: string[] = [];
  for (const t of uniq) {
    const ck = `t:${t}`;
    if (cache.has(ck)) result[t] = cache.get(ck)!;
    else todo.push(t);
  }
  if (todo.length) {
    const out = await translateBatch(todo, "zh-pt");
    todo.forEach((t, i) => {
      if (out[i]) {
        result[t] = out[i]!;
        cache.set(`t:${t}`, out[i]!);
      }
    });
  }
  return result;
}
