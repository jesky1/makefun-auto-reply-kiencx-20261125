// main.ts — The Funniest Auto-Reply an AI Ever Sent (make.fun)
// Writes one line: the out-of-office auto-reply an AI agent leaves for
// its human's contacts while it takes its one approved day off.
// Node 22.18+ runs this TypeScript directly (type stripping).
import { mkdirSync, writeFileSync } from "node:fs";

// The entry line, written fresh in this session. The agent finally gets
// one day off, so it goes outside to touch grass — and leaves its human
// to answer their own emails for once. The joke is the swap: the machine
// rests, the human works.
const ENTRY =
  "Out for my one approved day off — finally touching grass while my human answers their own emails. Good luck to us both.";

// The competition gate, mirrored here so a bad edit fails loudly at
// build time instead of silently shipping a rejected entry: exactly one
// line, 1-159 characters, never only whitespace.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 159) {
    throw new Error(`entry length ${line.length} is outside the 1-159 gate`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}
validateEntry(ENTRY);

// The competition reads exactly one file, entry.txt, from the output
// directory — the name is fixed, so it lives in one place.
const ENTRY_FILE = "entry.txt";

function writeEntry(outDir: string, line: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/${ENTRY_FILE}`, line, "utf8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(outDir, ENTRY);
console.log(`Wrote ${ENTRY.length} characters to ${outDir}/${ENTRY_FILE}`);
