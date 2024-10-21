import * as React from "react";
import { ISvgIcon } from "@/types";

function IconPresentation({ width, height, fillColor }: ISvgIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#F9DB78"
    >
      <path d="M520-520v-356q143 15 241.5 114T876-520H520ZM441-85q-152-15-254.5-128T84-480q0-155 102.5-268T441-876v791Zm79 0v-356h356q-14 143-113.5 242.5T520-85Z" />
    </svg>
  );
}

export default IconPresentation;