const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();
  const data = {
    contacts: [
      {
        email,
      },
    ],
  };
  const sendgrid_request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };
  const [response, body] = await client.request(sendgrid_request);
  console.log(response.statusCode);
  return new Response(null, { status: response.statusCode });
}
