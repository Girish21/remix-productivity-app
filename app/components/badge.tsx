import * as React from "react";

export const Badge = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className="rounded-sm px-2 py-1 text-sm bg-gray-300 grid place-content-center"
      {...props}
    />
  );
};
