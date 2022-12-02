/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["avatars.akamai.steamstatic.com"]
	},
	experimental: {
		forceSwcTransforms: true,
	},
};

module.exports = nextConfig;
