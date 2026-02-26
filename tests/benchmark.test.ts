import * as path from 'node:path';
import {Project} from 'ts-morph';
import {test, expect} from 'vitest';
import {ensureSourceFileInProject} from '../src/cli/ts-project';

const fixtureRoot = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/tsconfig.json',
);
const schemaConfigFile = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/schema/drizzle-zero.config.ts',
);

test(
  'project only loads the explicitly added file, not all tsconfig files',
  {timeout: 120_000},
  async () => {
    const project = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });

    ensureSourceFileInProject({
      tsProject: project,
      filePath: schemaConfigFile,
      debug: false,
    });

    const fileCount = project.getSourceFiles().length;

    console.log(`Files loaded: ${fileCount}`);

    // Regression guard: only the config file (and possibly a few resolved
    // dependencies) should be loaded. If someone accidentally re-introduces
    // eager loading, this will catch it.
    expect(fileCount).toBeLessThan(10);
  },
);
