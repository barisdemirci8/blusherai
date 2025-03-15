export async function POST(request: Request) {

    const body = await request.json();
    const { url } = body;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "failed fetching openai image URL: ",
          url,
          response.statusText,
        );

        return Response.error();
      }

      const imageBlob = await response.blob();

      return new Response(imageBlob, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch (error: any) {
      console.error("error generating image: ", error);
      return Response.error();
    }
}
