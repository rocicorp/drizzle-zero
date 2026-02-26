import * as path from 'node:path';
import {Project} from 'ts-morph';
import {describe, test, expect} from 'vitest';
import {addSourceFilesFromTsConfigSafe, ensureSourceFileInProject} from '../src/cli/ts-project';
import {discoverAllTsConfigs} from '../src/cli/tsconfig';

const fixtureRoot = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/tsconfig.json',
);
const schemaConfigFile = path.resolve(
  __dirname,
  'benchmarks/synthetic-monorepo/schema/drizzle-zero.config.ts',
);

describe('file loading performance', {timeout: 120_000}, () => {
  test('eager loading pulls in all files from all tsconfigs', async () => {
    const start = performance.now();

    const allTsConfigPaths = await discoverAllTsConfigs(fixtureRoot);
    const project = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });
    for (const tsConfigPath of allTsConfigPaths) {
      addSourceFilesFromTsConfigSafe({tsProject: project, tsConfigPath});
    }

    const eagerTime = performance.now() - start;
    const eagerFileCount = project.getSourceFiles().length;

    console.log(`Eager: ${eagerFileCount} files in ${eagerTime.toFixed(1)}ms`);

    // Eager should load all fixture files (500+)
    expect(eagerFileCount).toBeGreaterThan(400);
  });

  test('targeted loading only loads the requested file', async () => {
    const start = performance.now();

    const project = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });
    ensureSourceFileInProject({
      tsProject: project,
      filePath: schemaConfigFile,
      debug: false,
    });

    const lazyTime = performance.now() - start;
    const lazyFileCount = project.getSourceFiles().length;

    console.log(`Targeted: ${lazyFileCount} files in ${lazyTime.toFixed(1)}ms`);

    // Only the config file should be loaded
    expect(lazyFileCount).toBeLessThan(10);
  });

  test('targeted loading is faster than eager loading', async () => {
    // Eager
    const eagerStart = performance.now();
    const allTsConfigPaths = await discoverAllTsConfigs(fixtureRoot);
    const eagerProject = new Project({
      tsConfigFilePath: fixtureRoot,
      skipAddingFilesFromTsConfig: true,
    });
    for (const tsConfigPath of allTsConfigPaths) {
      addSourceFilesFromTsConfigSafe({tsProject: eagerProject, tsConfigPath});
    }
    const eagerTime = performance.now() - eagerStart;
    const eagerFileCount = eagerProject.getSourceFiles().length;

    // Targeted (current default)
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
    const lazyTime = performance.now() - lazyStart;
    const lazyFileCount = lazyProject.getSourceFiles().length;

    const speedup = eagerTime / lazyTime;

    console.log(`Eager:    ${eagerFileCount} files in ${eagerTime.toFixed(1)}ms`);
    console.log(`Targeted: ${lazyFileCount} files in ${lazyTime.toFixed(1)}ms`);
    console.log(`Speedup:  ${speedup.toFixed(1)}x faster`);

    expect(lazyFileCount).toBeLessThan(eagerFileCount);
    expect(lazyTime).toBeLessThan(eagerTime);
  });
});
