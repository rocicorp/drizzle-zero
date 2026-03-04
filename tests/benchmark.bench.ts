import {execSync} from 'node:child_process';
import * as path from 'node:path';
import {bench, describe} from 'vitest';

const cliPath = path.resolve(__dirname, '../dist/cli/index.js');
const fixtureDir = path.resolve(__dirname, 'benchmarks/synthetic-monorepo');
const cmd = `node ${cliPath} generate --config schema/drizzle-zero.config.ts --output /tmp/drizzle-zero-bench-output.ts --suppress-defaults-warning --force`;

// This synthetic benchmark shows a modest ~1.2x speedup because the fixture files
// are small and self-contained. In real monorepos with heavy type dependencies
// (Effect-TS, Drizzle ORM, etc.), the improvement is 4x+ because the eager path
// loads all files AND their transitive type dependencies from node_modules.
//
// Set DRIZZLE_ZERO_EAGER_LOADING=1 to force the old eager loading behavior.

describe('generate', () => {
  bench(
    'eager (DRIZZLE_ZERO_EAGER_LOADING=1)',
    () => {
      execSync(cmd, {
        cwd: fixtureDir,
        stdio: 'ignore',
        env: {...process.env, DRIZZLE_ZERO_EAGER_LOADING: '1'},
      });
    },
    {warmupIterations: 1, iterations: 5, time: 0},
  );

  bench(
    'lazy (default)',
    () => {
      execSync(cmd, {cwd: fixtureDir, stdio: 'ignore'});
    },
    {warmupIterations: 1, iterations: 5, time: 0},
  );
});
