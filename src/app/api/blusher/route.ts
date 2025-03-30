export async function POST(request: Request) {
  try {
    return Response.error();
  } catch (error: any) {
    console.error("error generating image: ", error);
    return Response.error();
  }
}
