const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, child_process: false };
    return config;
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
