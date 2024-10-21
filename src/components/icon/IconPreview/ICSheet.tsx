import * as React from "react";
import { ISvgIcon } from "@/types";

function ICSheet({ width, height, fillColor }: ISvgIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#78A75A"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-440q-17 0-28.5 11.5T280-520v200q0 17 11.5 28.5T320-280q17 0 28.5-11.5T360-320v-200q0-17-11.5-28.5T320-560Zm160-120q-17 0-28.5 11.5T440-640v320q0 17 11.5 28.5T480-280q17 0 28.5-11.5T520-320v-320q0-17-11.5-28.5T480-680Zm160 240q-17 0-28.5 11.5T600-400v80q0 17 11.5 28.5T640-280q17 0 28.5-11.5T680-320v-80q0-17-11.5-28.5T640-440Z" />
    </svg>
  );
}

export default ICSheet;