/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
  output: 'export', // 👈 QUESTA È LA RIGA FONDAMENTALE PER IL DEPLOY STATICO
};

module.exports = withBundleAnalyzer(nextConfig);
