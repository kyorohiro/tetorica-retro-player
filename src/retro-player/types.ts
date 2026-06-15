export type RetroPlayerLocale = "en" | "ja";

export type ConfirmDialogOptions = {
  title?: string;
  body?: string;
  okText?: string;
  cancelText?: string;
};

export type ConfirmDialogFn = (
  options: ConfirmDialogOptions,
) => boolean | Promise<boolean>;
