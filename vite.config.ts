import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [nitro({
		config: {
			compatibilityDate: "latest",

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
		}
	})],
});
