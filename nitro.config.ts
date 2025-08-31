import { defineNitroConfig } from "nitro/config";

// https://nitro.build/config
export default defineNitroConfig({
	compatibilityDate: "latest",
	srcDir: ".",

	experimental: {
		asyncContext: true,
	},

	$production: {
		storage: {
			auth: {
				// https://unstorage.unjs.io/drivers/redis
				driver: "redis",
				url: process.env.REDIS_URL,
			},
		},
	},

	$development: {
		storage: {
			auth: {
				driver: "memory",
			},
		},
	},

	runtimeConfig: {
		baseURL: process.env.BETTER_AUTH_URL,
	},
});
