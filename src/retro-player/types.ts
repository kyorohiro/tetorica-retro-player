export type RetroPlayerLocale = "en" | "ja";

export type ConfirmDialogOptions = {
  title?: string;
  body?: string;
  okText?: string;
  cancelText?: string;
  persistCheckboxLabel?: string;
  persistCheckboxDefaultChecked?: boolean;
  onConfirmPersistChange?: (checked: boolean) => void;
};

export type ConfirmDialogFn = (
  options: ConfirmDialogOptions,
) => boolean | Promise<boolean>;
