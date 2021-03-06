import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "remix";
import {
  Form,
  json,
  redirect,
  usePendingFormSubmit,
  useRouteData,
} from "remix";
import {
  Button,
  Container,
  ErrorLabel,
  Heading,
  Input,
  Label,
  LoadIndicator,
  Main,
  Section,
} from "../components/authfields";
import Loader from "../components/loader";
import { prisma } from "../db";
import { compare } from "../password_hash.server";
import { commitSession, getSession } from "../session";

type Errors = {
  email: Record<string, string>;
  password: Record<string, string>;
};

type RouteData = {
  email?: string;
  errors?: Errors;
  password?: string;
  submitError?: string;
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: Loader.styles }];
};

export const meta: MetaFunction = () => {
  return { title: "Login!" };
};

export const action: ActionFunction = async ({ request }) => {
  const data = new URLSearchParams(await request.text());
  const session = await getSession(request.headers.get("Cookie"));

  const errors: Errors = {
    email: {},
    password: {},
  };
  const email = data.get("email");
  const password = data.get("password");
  let error = false;

  if (!email) {
    errors.email.error = "Email is required";
    error = true;
  }
  if (!password) {
    errors.password.error = "Password is required";
    error = true;
  }

  if (error) {
    session.flash("errors", errors);
    session.flash("email", email!);
    session.flash("password", password!);
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  try {
    const row = await prisma.user.findUnique({
      select: { id: true, password: true },
      where: { email: email! },
    });
    if (row) {
      const { id, password: hash } = row;
      if (await compare(password!, hash)) {
        session.set("user_id", id);
        return redirect("/", {
          headers: { "Set-Cookie": await commitSession(session) },
          status: 301,
        });
      } else {
        session.flash("email", email!);
        session.flash("password", password!);
        session.flash("submit_error", "Invalid Username / Password");
        return redirect("/login", {
          headers: { "Set-Cookie": await commitSession(session) },
        });
      }
    } else {
      session.flash("email", email!);
      session.flash("password", password!);
      session.flash("submit_error", "Invalid Username / Password");
      return redirect("/login", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
  } catch (e) {
    session.flash("email", email!);
    session.flash("password", password!);
    session.flash("submit_error", { message: "Something went wrong!" });
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const errors = session.get("errors");
  const submitError = session.get("submit_error");
  const email = session.get("email");
  const password = session.get("password");

  return json(
    { errors, submitError, email, password },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function Login() {
  const data = useRouteData<RouteData>();
  const isFormPending = usePendingFormSubmit();

  const emailError = data.errors?.email;
  const passwordError = data.errors?.password;

  return (
    <Main>
      <Form replace method="post">
        <fieldset disabled={!!isFormPending}>
          <Section>
            <Heading>Login</Heading>
            <Container>
              <Label htmlFor="login_email">Email</Label>
              <Input
                id="login_email"
                name="email"
                placeholder="Email"
                type="email"
                defaultValue={data.email}
                {...(emailError && {
                  "aria-describedby": "login_email_error",
                  "aria-invalid": true,
                })}
              />
              {emailError && (
                <ErrorLabel id="login_email_error">
                  {emailError.error}
                </ErrorLabel>
              )}
            </Container>
            <Container>
              <Label htmlFor="login_password">Password</Label>
              <Input
                id="login_password"
                name="password"
                placeholder="Password"
                type="password"
                defaultValue={data.password}
                {...(passwordError && {
                  "aria-describedby": "login_password_error",
                  "aria-invalid": true,
                })}
              />
              {passwordError && (
                <ErrorLabel id="login_password_error">
                  {passwordError.error}
                </ErrorLabel>
              )}
            </Container>
            {data.submitError && <ErrorLabel>{data.submitError}</ErrorLabel>}
            <Button type="submit">
              {isFormPending && <LoadIndicator />}
              <span>submit</span>
            </Button>
          </Section>
        </fieldset>
      </Form>
    </Main>
  );
}
