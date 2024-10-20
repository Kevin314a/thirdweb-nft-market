'use client'

import { Button } from "@/components/base";
import Link from "next/link";

export default function GlobalError(props: {
  error: Error;
  reset: () => void;
}) {
  console.log(props.error);

  return (
    <div className="w-full h-full min-h-[calc(100vh-96px)] flex items-center justify-center flex-col mt-24 text-white">
      <h2>Sorry, an error occured loading this page.</h2>
      <p className="mt-2">
        Please try again, or contact our customer support team if this issue
        persists.
      </p>
      <div className="flex gap-2 items-center mt-4">
        <Link href="/">
          <Button>Return home</Button>
        </Link>
      </div>
    </div>
  );
}
