"use client";

import { HexColorPicker } from "react-colorful";
import * as Popover from "@radix-ui/react-popover";
import "./style.css";

export function ColorPicker({ color, onChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="color-trigger" style={{ backgroundColor: color }} />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align="center"
          sideOffset={8}
          className="color-popover"
        >
          <HexColorPicker color={color} onChange={onChange} />
          <Popover.Arrow className="color-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
