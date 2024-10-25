
const nextConfig = {}
 
import analyze from '@next/bundle-analyzer'
const withBundleAnalyzer = analyze({
    enabled: process.env.ANALYZE === 'true',
})
 
module.exports = withBundleAnalyzer(nextConfig)
