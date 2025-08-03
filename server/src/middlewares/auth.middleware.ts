import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function verifyJWT(request: FastifyRequest) {
	const token = request.cookies.token;
	if (!token) throw new Error("Unauthorized");

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET!);

		if (
			typeof payload === "object" &&
			"id" in payload &&
			"email" in payload
		) {
			request.user = {
				id: payload.id as number,
				email: payload.email as string,
			};
		} else {
			throw new Error("Invalid token payload structure");
		}
	} catch (err) {
		throw new Error("Invalid token");
	}
}
