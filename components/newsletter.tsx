import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import localFont from "next/font/local";
const cabinet = localFont({
  src: "../public/CabinetGrotesk-Variable.ttf",
});
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

export default async function Newsletter() {
  async function submitEmail(formData: FormData) {
    "use server";
    const data = {
      contacts: [
        {
          email: formData.get("email"),
        },
      ],
    };
    const sendgrid_request = {
      url: `/v3/marketing/contacts`,
      method: "PUT",
      body: data,
    };
    const [response, body] = await client.request(sendgrid_request);
  }
  return (
    <div
      className={`${cabinet.className} relative isolate overflow-hidden bg-neutral-200 dark:bg-neutral-900 py-16 sm:py-16 rounded-xl my-16 mx-4`}
    >
      <div className="mx-auto max-w-7xl px-6 ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 ">
          <div className="max-w-xl ">
            <dl className="flex flex-col gap-x-6 gap-y-6">
              <div className="flex items-center">
                <div className="rounded-md bg-white/5 p-2 ring-1 dark:ring-white/10 ring-neutral-300">
                  <HandRaisedIcon
                    className="h-6 w-6 dark:text-neutral-400 text-neutral-600"
                    aria-hidden="true"
                  />
                </div>
                <dt className="ml-4 dark:text-neutral-400 text-neutral-600">
                  No spam
                </dt>
              </div>
              <div className="flex items-center">
                <div className="rounded-md bg-white/5 p-2 ring-1 dark:ring-white/10 ring-neutral-300">
                  <CalendarDaysIcon
                    className="h-6 w-6 dark:text-neutral-400 text-neutral-600"
                    aria-hidden="true"
                  />
                </div>
                <dt className="ml-4 dark:text-neutral-400 text-neutral-600">
                  1-2 articles per month
                </dt>
              </div>
            </dl>
            <h2
              className={` text-2xl font-bold tracking-tight dark:text-white text-neutral-950 mt-8`}
            >
              Subscribe to the newsletter.
            </h2>

            <div className="mt-4 flex max-w-md gap-x-4">
              {/* @ts-expect-error Server Component */}
              <form action={submitEmail}>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-neutral-50 dark:bg-white/5 px-3.5 py-2 text-neutral-700 dark:text-neutral-100 shadow-sm ring-1 ring-inset  ring-white/10 focus:ring-2 focus:ring-inset focus:ring-neutral-500 sm:text-sm sm:leading-6 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-neutral-900 dark:bg-neutral-300 px-3.5 py-2.5 text-sm font-semibold text-neutral-100 dark:text-neutral-800 shadow-sm hover:bg-neutral-700 dark:hover:bg-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
