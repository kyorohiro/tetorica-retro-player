import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const docs = [
  { source: "manual.md", output: "manual.html", lang: "ja", title: "Tetorica Retro Player 取り扱い説明書" },
  { source: "manual.en.md", output: "manual.en.html", lang: "en", title: "Tetorica Retro Player — User Manual" },
];

try {
  execFileSync("pandoc", ["--version"], { stdio: "ignore" });
} catch {
  console.error("pandoc not found. Install it first, e.g. `brew install pandoc`.");
  process.exit(1);
}

function render({ source, output, lang, title }) {
  const sourcePath = path.join("docs", source);
  const outputPath = path.join("docs", output);

  const body = execFileSync("pandoc", ["-f", "gfm", "-t", "html5", sourcePath], {
    encoding: "utf-8",
  });

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<style>
  body {
    font-family: "Hiragino Sans", "Yu Gothic", "Noto Sans JP", "Helvetica Neue", Arial, sans-serif;
    line-height: 1.7;
    max-width: 820px;
    margin: 0 auto;
    padding: 32px 20px 80px;
    color: #1c1c22;
  }
  h1, h2, h3 { color: #17324d; }
  h2 { border-bottom: 2px solid #2b6cb0; padding-bottom: 4px; margin-top: 2.5em; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; vertical-align: top; }
  th { background: #eaf1fb; }
  code { background: #f1f5f9; padding: 1px 5px; border-radius: 3px; }
  hr { border: none; border-top: 1px solid #d0d7de; margin: 2em 0; }
</style>
</head>
<body>
${body}
</body>
</html>
`;

  fs.writeFileSync(outputPath, html);
  console.log(`generated ${outputPath} from ${sourcePath}`);
}

for (const doc of docs) {
  render(doc);
}

console.log("Need a PDF? Open an HTML file in a browser and use Print > Save as PDF.");
