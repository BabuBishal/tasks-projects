import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  function middleware(req: NextRequest) {
    return intlMiddleware(req);
  },
  {
    pages: {
      signIn: "/en/login", // redirect unauthenticated users
    },
  }
);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/:locale/dashboard/:path*",
  ],
};
