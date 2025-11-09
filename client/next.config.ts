import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ir-*.ozone.ru",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
