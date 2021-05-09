import { createCookieSessionStorage } from "remix";

const {
  commitSession,
  destroySession,
  getSession,
} = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    secure: true,
    name: "__session",
    path: "/",
    secrets: ["my secret"],
  },
});

export { commitSession, destroySession, getSession };
