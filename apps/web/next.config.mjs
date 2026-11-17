/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@community/shared"],
  images: {
    // Fotografias dos marketplaces (CDN da Alibaba). Apenas https.
    remotePatterns: [
      { protocol: "https", hostname: "*.alicdn.com" },
      { protocol: "https", hostname: "*.goofish.com" }
    ]
  }
};
export default nextConfig;
