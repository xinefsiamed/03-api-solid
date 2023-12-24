import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    payload: {}; // payload type is used for signing and verifying
    user: {
      sub: string;
    };
  }
}
