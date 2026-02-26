import * as path from 'node:path';
import {Project} from 'ts-morph';
import {bench, describe} from 'vitest';
import {
  addSourceFilesFromTsConfigSafe,
  ensureSourceFileInProject,
} from '../src/cli/ts-project';
import {discoverAllTsConfigs} from '../src/cli/tsconfig';

const fixtureRoot = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/tsconfig.json',
);
const schemaConfigFile = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/schema/drizzle-zero.config.ts',
);

describe('file loading', () => {
  bench('eager: load all files from all tsconfigs', async () => {
    const allTsConfigPaths = await discoverAllTsConfigs(fixtureRoot);
    const project = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });
    for (const tsConfigPath of allTsConfigPaths) {
      addSourceFilesFromTsConfigSafe({tsProject: project, tsConfigPath});
    }
  });

  bench('targeted: load only the requested file', async () => {
    const project = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });
    ensureSourceFileInProject({
      tsProject: project,
      filePath: schemaConfigFile,
      debug: false,
    });
  });
});
