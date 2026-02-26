import {execSync} from 'node:child_process';
import * as path from 'node:path';
import {bench, describe} from 'vitest';

const cliPath = path.resolve(__dirname, '../dist/cli/index.js');
const fixtureDir = path.resolve(__dirname, 'benchmarks/synthetic-monorepo');

describe('generate', () => {
  bench(
    'end-to-end generate on synthetic monorepo',
    () => {
      execSync(
        `node ${cliPath} generate --config schema/drizzle-zero.config.ts --output /tmp/drizzle-zero-bench-output.ts --suppress-defaults-warning --force`,
        {cwd: fixtureDir, stdio: 'ignore'},
      );
    },
    {warmupIterations: 1, iterations: 5, time: 0},
  );
});
