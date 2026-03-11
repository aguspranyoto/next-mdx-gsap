import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { POST: standardPOST, GET } = toNextJsHandler(auth);

export { GET };

export async function POST(req: Request) {
  const url = new URL(req.url);

  // Intercept sign-up to restrict email
  if (url.pathname.includes("/sign-up/email")) {
    try {
      const clonedReq = req.clone();
      const body = await clonedReq.json();

      const allowedEmail = process.env.ALLOWED_EMAIL || "agusprnyt@gmail.com";

      if (body.email !== allowedEmail) {
        return new Response(
          JSON.stringify({
            message: "Registration is restricted to the site owner.",
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (e) {
      // Body might be invalid or something, let better-auth handle it or return error
      console.error(e);
    }
  }

  // Also intercept sign-in to ONLY allow that email, just in case
  if (url.pathname.includes("/sign-in/email")) {
    try {
      const clonedReq = req.clone();
      const body = await clonedReq.json();

      const allowedEmail = process.env.ALLOWED_EMAIL || "agusprnyt@gmail.com";

      if (body.email !== allowedEmail) {
        return new Response(
          JSON.stringify({ message: "Login is restricted to the site owner." }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  return standardPOST(req);
}
