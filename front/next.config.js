/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "http2.mlstatic.com",
      "m.media-amazon.com",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
