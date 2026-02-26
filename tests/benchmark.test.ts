import * as path from 'node:path';
import {Project} from 'ts-morph';
import {test, expect} from 'vitest';
import {discoverAllTsConfigs} from '../src/cli/tsconfig';
import {
  addSourceFilesFromTsConfigSafe,
  ensureSourceFileInProject,
} from '../src/cli/ts-project';

const fixtureRoot = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/tsconfig.json',
);
const schemaConfigFile = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/schema/drizzle-zero.config.ts',
);

test(
  'lazy loading loads fewer files and is faster than eager loading',
  {timeout: 120_000},
  async () => {
    // -- EAGER approach: discover all tsconfigs, add all source files --
    const eagerStart = performance.now();

    const allTsConfigPaths = await discoverAllTsConfigs(fixtureRoot);

    const eagerProject = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });

    for (const tsConfigPath of allTsConfigPaths) {
      addSourceFilesFromTsConfigSafe({
        tsProject: eagerProject,
        tsConfigPath,
        debug: false,
      });
    }

    ensureSourceFileInProject({
      tsProject: eagerProject,
      filePath: schemaConfigFile,
      debug: false,
    });

    const eagerFileCount = eagerProject.getSourceFiles().length;
    const eagerTime = performance.now() - eagerStart;

    // -- LAZY approach: only load the config file and resolve its dependencies --
    const lazyStart = performance.now();

    const lazyProject = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });

    ensureSourceFileInProject({
      tsProject: lazyProject,
      filePath: schemaConfigFile,
      debug: false,
    });

    const lazyFileCount = lazyProject.getSourceFiles().length;
    const lazyTime = performance.now() - lazyStart;

    // -- Report --
    const ratio = eagerTime / lazyTime;
    console.log(`Eager: ${eagerFileCount} files in ${eagerTime.toFixed(1)}ms`);
    console.log(`Lazy:  ${lazyFileCount} files in ${lazyTime.toFixed(1)}ms`);
    console.log(`Ratio: eager is ${ratio.toFixed(2)}x slower than lazy`);

    // -- Assertions --
    expect(lazyFileCount).toBeLessThan(eagerFileCount);
    expect(lazyTime).toBeLessThan(eagerTime);
  },
);
