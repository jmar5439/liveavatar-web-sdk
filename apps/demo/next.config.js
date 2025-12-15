/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["files2.heygen.ai"], // agrega aquí todos los hostnames de imágenes externas que uses
  },
  transpilePackages: ["@heygen/liveavatar-web-sdk"],
};

export default nextConfig;
