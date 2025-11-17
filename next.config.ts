const nextConfig = {
  // Vi bruger Vercel med serverless-funktioner, så vi skal IKKE bruge static export.
  // Output: "export" er fjernet, så API-routes som /api/send-order virker.
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
