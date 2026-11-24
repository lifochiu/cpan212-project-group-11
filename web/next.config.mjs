const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error("API_URL is missing. Copy .env.example to .env.local.");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${apiUrl}/api/:path*` },
    ];
  },
};

export default nextConfig;
