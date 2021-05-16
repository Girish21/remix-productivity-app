import * as React from "react";
import Loader from "./loader";

const Main = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <main
    className="h-full p-4 bg-gradient-to-r from-blue-800 to-blue-400 grid place-content-center shadow-md"
    {...props}
  />
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-full focus:outline-none px-2 py-1 rounded-md border border-gray-600 placeholder-gray-500 placeholder-opacity-75 text-gray-800 focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-200 disabled:text-gray-400"
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
    className="flex items-center py-2 px-6 mx-auto mt-6! text-lg text-center text-white font-bold uppercase space-x-3 bg-blue-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
    {...props}
  />
);

const ErrorLabel = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-red-600 text-sm" {...props} />
);

const Section = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <section
    className="rounded-xl bg-white p-11 px-12 sm:p-12 sm:px-20 flex items-start justify-center flex-col space-y-6 sm:max-w-md"
    {...props}
  />
);

const Heading = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className="w-full text-2xl text-center" {...props} />
);

const LoadIndicator = () => <Loader style={{ width: 24, height: 24 }} />;

export {
  Button,
  Container,
  ErrorLabel,
  Heading,
  Input,
  Label,
  LoadIndicator,
  Main,
  Section,
};
