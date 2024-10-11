import React from "react";
import useContextMenu from "@/hooks/use-context-menu";

interface TutorialContextMenuProps {
  outerRef: React.MutableRefObject<HTMLElement | null>;
}

export function ContextMenu({ outerRef }: TutorialContextMenuProps) {
  const { xPos, yPos, menu } = useContextMenu(outerRef);
  return (
    <div
      className={`fixed z-10 ${
        menu ? "block" : "hidden"
      } w-48 py-2bg-slate-600 rounded-md shadow-lg`}
      style={{ top: yPos, left: xPos }}
    >
      <div className="px-4 py-2 text-sm text-gray-700">Download</div>
      <div className="px-4 py-2 text-sm text-gray-700">Rename</div>
      <div className="px-4 py-2 text-sm text-gray-700">Delete</div>
    </div>
  );
}
