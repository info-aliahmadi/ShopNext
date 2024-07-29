// export { default } from "next-auth/middleware"
import AllRoutes from './app/dashboard/_lib/routes';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import CONFIG from './config';
import { NextRequest } from 'next/server';

export const config = { matcher: ['/dashboard/:path*'] };

export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: async ({ token, req }: { token: any; req: NextRequest }) => {
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (token) {
          const path = req.nextUrl.pathname;
          const jwt = token.accessToken;

          const route = AllRoutes.routes.find((item) => item.path == path);

          // find(AllRoutes.routes, (element: any) => element.path == path);
          if (route) {
            const Authorized = await isAuthorized(route.permission, jwt);
            if (!Authorized) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
  }
});
async function isAuthorized(permission: string, jwt: string): Promise<boolean> {
  const apiResult = await fetch(CONFIG.API_BASEPATH + '/Auth/GetPermissionsOfCurrentUser', {
    headers: {
      Authorization: `Bearer ${jwt}`,
      credentials: 'include'
    },
    next: { revalidate: 4000 }
  });
  if (apiResult.ok) {
    const permissions = await apiResult.json();
    let result = permissions.findIndex((element: string) => element === permission);
    return result >= 0 ? true : false;
  } else {
    return false;
  }
}
