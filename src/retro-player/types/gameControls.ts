export type NesControlButton =
  | "up"
  | "down"
  | "left"
  | "right"
  | "a"
  | "b"
  | "start"
  | "select";

export type RetroGameControls = {
  kind: "nes";
  pressButton: (button: NesControlButton) => void;
  releaseButton: (button: NesControlButton) => void;
  reset: () => void;
};
