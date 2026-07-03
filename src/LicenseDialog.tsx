import React from "react";
import { t, type Locale } from "./i18n";
import licenseData from "./licenses.json";

type LicenseEntry = {
  name: string;
  version: string | null;
  license: string;
  note?: string;
};

type LicenseGroup = {
  key: string;
  title: string;
  entries: LicenseEntry[];
};

export const LicenseDialog: React.FC<{
  locale: Locale;
  onClose: () => void;
}> = ({ locale, onClose }) => {
  const [query, setQuery] = React.useState("");

  const groups: LicenseGroup[] = React.useMemo(() => {
    const filter = (entries: LicenseEntry[]) => {
      const q = query.trim().toLowerCase();
      if (!q) return entries;
      return entries.filter((entry) => entry.name.toLowerCase().includes(q));
    };

    return [
      { key: "npm", title: t(locale, "licensesGroupNpm"), entries: filter(licenseData.npm) },
      { key: "rust", title: t(locale, "licensesGroupRust"), entries: filter(licenseData.rust) },
      { key: "other", title: t(locale, "licensesGroupOther"), entries: filter(licenseData.other) },
    ];
  }, [locale, query]);

  const totalCount = groups.reduce((sum, group) => sum + group.entries.length, 0);

  return (
    <div className="safe-dialog-card flex h-[min(88vh,720px)] w-[min(96vw,640px)] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-slate-100 shadow-xl">
      <div className="shrink-0 border-b border-slate-700 px-4 py-3">
        <h2 className="text-lg font-semibold">{t(locale, "licensesTitle")}</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.currentTarget.value); }}
          placeholder={t(locale, "licensesSearchPlaceholder")}
          className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {totalCount === 0 ? (
          <p className="text-xs text-slate-400">{t(locale, "licensesNoResults")}</p>
        ) : (
          groups.map((group) =>
            group.entries.length === 0 ? null : (
              <details key={group.key} className="mb-3" open={Boolean(query.trim())}>
                <summary className="cursor-pointer select-none text-sm font-medium text-slate-200">
                  {group.title} ({group.entries.length})
                </summary>
                <ul className="mt-2 space-y-1.5 border-l border-slate-700 pl-3">
                  {group.entries.map((entry) => (
                    <li key={`${entry.name}@${entry.version ?? ""}`} className="text-xs">
                      <span className="font-medium text-slate-100">{entry.name}</span>
                      {entry.version && <span className="text-slate-500"> v{entry.version}</span>}
                      <span className="text-slate-400"> — {entry.license}</span>
                      {entry.note && (
                        <p className="mt-0.5 text-[11px] leading-normal text-slate-500">{entry.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ),
          )
        )}
      </div>

      <div className="shrink-0 border-t border-slate-700 px-4 py-3">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            {t(locale, "close")}
          </button>
        </div>
      </div>
    </div>
  );
};
