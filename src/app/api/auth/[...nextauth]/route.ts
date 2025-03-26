import { handlers } from "@/auth";

// const handler = async (
//   req: NextApiRequest,
//   resp: NextApiResponse,
//   authOptions: NextAuthOptions,
// ): Promise<any> => {
//   return NextAuth(req, resp, authenticationOptions);
// };

export const { GET, POST } = handlers;
