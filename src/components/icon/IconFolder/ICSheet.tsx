import * as React from "react";
import { ISvgIcon } from "@/types";

function ICSheet({ width, height, fillColor }: ISvgIcon) {
  return (
    <svg
      data-testid="geist-icon"
      width={width}
      height={height}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      className="text-green-400"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 1V1.75V14.25V15H12.5V14.25V1.75V1H14ZM8.75 6V6.75V14.25V15H7.25V14.25V6.75V6H8.75ZM3.5 4.75V4H2V4.75V14.25V15H3.5V14.25V4.75Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default ICSheet;
