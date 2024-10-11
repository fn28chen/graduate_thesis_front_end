import * as React from "react";
import { ISvgIcon } from "@/types";

function ICFile({ width, height }: ISvgIcon) {
  return (
    <svg
      data-testid="geist-icon"
      width={width}
      height={height}
      stroke-linejoin="round"
      viewBox="0 0 16 16"
      className="text-neutral-400"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 6.5V13.5C14.5 14.8807 13.3807 16 12 16H4C2.61929 16 1.5 14.8807 1.5 13.5V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5ZM13 6.5V13.5C13 14.0523 12.5523 14.5 12 14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13ZM9.5 2.12132V5H12.3787L9.5 2.12132Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default ICFile;