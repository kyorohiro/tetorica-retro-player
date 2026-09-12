import { expect, it } from "vitest";
import { importPresetFile } from "./presetFile";

const presetFile = (filter: Record<string, unknown>) => new File([
  JSON.stringify({ fileType: "tetorica-retro-player-settings", version: 1, filter }),
], "test.retro.json", { type: "application/json" });

it("restores display target settings from a preset file", async () => {
  const result = await importPresetFile(presetFile({
    autoTargetSize: true, autoTargetSizeBasis: "display", autoTargetSpacing: 2.5,
  }));
  expect(result?.filter).toMatchObject({
    autoTargetSize: true, autoTargetSizeBasis: "display", autoTargetSpacing: 2.5,
  });
});

it("keeps older preset files on source sizing and normalizes invalid options", async () => {
  const legacy = await importPresetFile(presetFile({ targetWidth: 320, targetHeight: 240 }));
  expect(legacy?.filter).toMatchObject({
    targetWidth: 320, targetHeight: 240, autoTargetSizeBasis: "source", autoTargetSpacing: 1,
  });
  const invalid = await importPresetFile(presetFile({ autoTargetSizeBasis: "invalid", autoTargetSpacing: 20 }));
  expect(invalid?.filter).toMatchObject({ autoTargetSizeBasis: "source", autoTargetSpacing: 5 });
});

it("migrates the legacy spacing to both axes and preserves separate axes", async () => {
  const legacy = await importPresetFile(presetFile({ autoTargetSpacing: 4.2 }));
  expect(legacy?.filter).toMatchObject({ autoTargetSpacing: 4.2, autoTargetSpacingY: 4.2 });
  const separate = await importPresetFile(presetFile({ autoTargetSpacing: 4, autoTargetSpacingY: 2 }));
  expect(separate?.filter).toMatchObject({ autoTargetSpacing: 4, autoTargetSpacingY: 2 });
});
