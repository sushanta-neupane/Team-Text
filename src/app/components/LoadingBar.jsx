import React from "react";
import { Progress, Spinner } from "@nextui-org/react";

export default function LoadingBar({ show }) {
  return show ? (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Spinner label="Loading..."  />
    </div>
  ) : null;
}
