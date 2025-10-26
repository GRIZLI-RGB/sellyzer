import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ir-8.ozone.ru",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
