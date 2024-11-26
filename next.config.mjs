/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webp: {
    preset: "default",
    quality: 100,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test-bucket.s3.us-east-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nestjs-uploader-indicloud.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
