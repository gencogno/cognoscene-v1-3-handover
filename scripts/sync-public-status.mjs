import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'data', 'public-feature-status.json');
const destination = resolve(root, 'dist', 'public-feature-status.json');
const sourceText = await readFile(source, 'utf8');
const status = JSON.parse(sourceText);
const validStates = new Set(['current', 'locked', 'completed', 'tentative']);

if (status.schemaVersion !== 2 || !status.atlas || !Array.isArray(status.atlas.phases)) {
  throw new Error('Public status must use the Atlas 2.5 schema.');
}
if (status.atlas.advanceAuthority !== 'github-reviewed-status') {
  throw new Error('Atlas advancement must remain GitHub-reviewed.');
}
if (status.atlas.phases.filter((phase) => phase.state === 'current').length !== 1) {
  throw new Error('Atlas must have exactly one current phase.');
}
if (status.atlas.phases.some((phase) => !validStates.has(phase.state))) {
  throw new Error('Atlas contains an unsupported phase state.');
}
if (!status.atlas.phases.some((phase) => phase.id === status.atlas.currentPhaseId && phase.state === 'current')) {
  throw new Error('currentPhaseId must name the current phase.');
}

await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);
console.log('Public Atlas status synced.');
