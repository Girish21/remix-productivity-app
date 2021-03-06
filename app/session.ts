import { redirect, Request } from "remix";
import { createCookieSessionStorage, LoaderFunction } from "remix";

const { commitSession, destroySession, getSession } =
  createCookieSessionStorage({
    cookie: {
      httpOnly: true,
      secure: true,
      name: "__session",
      path: "/",
      secrets: ["my secret"],
    },
  });

type UserSession = {
  id: string;
};

const getUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("user_id");
};

const requireUserSession = async (
  request: Request,
  next: (session: UserSession) => ReturnType<LoaderFunction>
) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("user_id");
  if (!userId) {
    return redirect("/login");
  }
  return next({ id: userId });
};

export {
  commitSession,
  destroySession,
  getSession,
  getUserSession,
  requireUserSession,
};
