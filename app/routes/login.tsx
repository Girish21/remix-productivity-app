import * as React from "react";
import { Form } from "remix";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-full focus:outline-none px-2 py-1 rounded-md border border-gray-600 placeholder-gray-500 placeholder-opacity-75 focus:ring-1 focus:ring-black"
      {...props}
    />
  );
};

const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className="block text-sm focus:text-blue-900" {...props} />;
};

const Container = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="w-full space-y-1" {...props} />
);

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="submit"
    className="w-min py-2 px-6 mx-auto mt-6! text-lg text-center text-white font-bold uppercase bg-blue-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
    {...props}
  />
);

export default function Login() {
  return (
    <main className="h-full bg-gradient-to-r from-blue-800 to-blue-400 grid place-content-center shadow-md">
      <Form replace method="post">
        <fieldset>
          <section className="rounded-xl bg-white p-11 px-24 flex items-start justify-center flex-col space-y-6 sm:w-[40vw]">
            <h1 className="w-full text-2xl text-center">Login</h1>
            <Container>
              <Label htmlFor="login_email">Email</Label>
              <Input
                id="login_email"
                name="email"
                placeholder="Email"
                type="email"
              />
            </Container>
            <Container>
              <Label htmlFor="login_password">Password</Label>
              <Input
                id="login_password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </Container>
            <Button>submit</Button>
          </section>
        </fieldset>
      </Form>
    </main>
  );
}
