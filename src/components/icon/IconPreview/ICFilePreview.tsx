import * as React from "react";
import { ISvgIcon } from "@/types";

function ICFilePreview({ width, height }: ISvgIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="60px"
      viewBox="0 -960 960 960"
      width="60px"
      fill="#FFFFFF"
      opacity={0.5}
    >
      <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560q0 17 11.5 28.5T560-600h160L520-800v160Z" />
    </svg>
  );
}

export default ICFilePreview;
