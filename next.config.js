const nextConfig = {};

const analyze = require("@next/bundle-analyzer");
const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
