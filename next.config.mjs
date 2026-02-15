/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Set turbopack root to this project so Next infers the correct workspace
  turbopack: {
    root: './'
  }
};

export default nextConfig;
