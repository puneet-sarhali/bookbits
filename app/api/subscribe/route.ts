const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  const data = {
    contacts: [
      {
        email: "pssarhali@gmail.com",
      },
    ],
  };
  const sendgrid_request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };
  const [response, body] = await client.request(sendgrid_request);
  console.log(body);
  return new Response("Hello, Next.js!");
}
