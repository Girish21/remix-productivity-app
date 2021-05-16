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
import { hash } from "../password_hash.server";
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
  return { title: "Signup!" };
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
    return redirect("/signup", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  try {
    const hashedPassword = await hash(password!);
    const row = await prisma.user.create({
      data: { email: email!, password: hashedPassword },
      select: { id: true },
    });
    if (row) {
      session.set("user_id", row.id);
      return redirect("/", {
        headers: { "Set-Cookie": await commitSession(session) },
        status: 301,
      });
    } else {
      session.flash("email", email!);
      session.flash("password", password!);
      session.flash("submit_error", "Invalid Username / Password");
      return redirect("/signup", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
  } catch (e) {
    if (e.code === "P2002") {
      session.flash("submit_error", "An account already exist");
    } else {
      session.flash("submit_error", "Something went wrong!");
    }
    session.flash("email", email!);
    session.flash("password", password!);
    return redirect("/signup", {
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
            <Heading>Signup</Heading>
            <Container>
              <Label htmlFor="signup_email">Email</Label>
              <Input
                id="signup_email"
                name="email"
                placeholder="Email"
                type="email"
                defaultValue={data.email}
                {...(emailError && {
                  "aria-describedby": "signup_email_error",
                  "aria-invalid": true,
                })}
              />
              {emailError && (
                <ErrorLabel id="signup_email_error">
                  {emailError.error}
                </ErrorLabel>
              )}
            </Container>
            <Container>
              <Label htmlFor="signup_password">Password</Label>
              <Input
                id="signup_password"
                name="password"
                placeholder="Password"
                type="password"
                defaultValue={data.password}
                {...(passwordError && {
                  "aria-describedby": "signup_password_error",
                  "aria-invalid": true,
                })}
              />
              {passwordError && (
                <ErrorLabel id="signup_password_error">
                  {passwordError.error}
                </ErrorLabel>
              )}
            </Container>
            {!isFormPending && data.submitError && (
              <ErrorLabel>{data.submitError}</ErrorLabel>
            )}
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
