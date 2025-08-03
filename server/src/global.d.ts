import "fastify";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
	interface FastifyRequest {
		user?: {
			id: number;
			email: string;
		};
	}
	interface FastifyInstance {
		googleOAuth2: OAuth2Namespace;
	}
}
