import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'node:url';
import type {Project} from 'ts-morph';
import {tsImport} from 'tsx/esm/api';
import type {DrizzleToZeroSchema} from '../relations';

export const defaultConfigFilePath = 'drizzle-zero.config.ts';

export const getDefaultConfigFilePath = async () => {
  const fullConfigPath = path.resolve(process.cwd(), defaultConfigFilePath);

  try {
    await fs.access(fullConfigPath);
  } catch {
    return null;
  }

  return 'drizzle-zero.config.ts';
};

export const getConfigFromFile = async ({
  configFilePath,
  tsProject,
}: {
  configFilePath: string;
  tsProject: Project;
}) => {
  const fullConfigPath = path.resolve(process.cwd(), configFilePath);

  try {
    await fs.access(fullConfigPath);
  } catch {
    throw new Error(
      `❌ drizzle-zero: Failed to find config file at ${fullConfigPath}`,
    );
  }

  const typeModuleErrorMessage = `. You may need to add \` "type": "module" \` to your package.json.`;

  try {
    const zeroConfigFilePathUrl = url.pathToFileURL(fullConfigPath).href;
    const zeroConfigImport = await tsImport(
      zeroConfigFilePathUrl,
      import.meta.url,
    );
    const exportName = zeroConfigImport?.default ? 'default' : 'schema';
    const zeroSchema = zeroConfigImport?.default ?? zeroConfigImport?.schema;

    const typeDeclarations = getZeroSchemaDefsFromConfig({
      tsProject,
      configPath: fullConfigPath,
      exportName,
    });

    return {
      type: 'config',
      zeroSchema: zeroSchema as DrizzleToZeroSchema<any> | undefined,
      exportName,
      zeroSchemaTypeDeclarations: typeDeclarations,
    } as const;
  } catch (error) {
    console.error(
      `❌ drizzle-zero: Failed to import config file at ${fullConfigPath}${typeModuleErrorMessage}`,
      error,
    );
    process.exit(1);
  }
};

export function getZeroSchemaDefsFromConfig({
  tsProject,
  configPath,
  exportName,
}: {
  tsProject: Project;
  configPath: string;
  exportName: string;
}) {
  const fileName = configPath.slice(configPath.lastIndexOf('/') + 1);

  const sourceFile = tsProject.getSourceFile(fileName);

  if (!sourceFile) {
    throw new Error(
      `❌ drizzle-zero: Failed to find type definitions for ${fileName}`,
    );
  }

  // try targeted lookup to avoid getExportedDeclarations() which forces full type resolution
  if (exportName === 'default') {
    const exportAssignment = sourceFile.getExportAssignment(
      d => !d.isExportEquals(),
    );
    if (exportAssignment) {
      return [exportName, exportAssignment] as const;
    }
  } else {
    const variableDeclaration = sourceFile.getVariableDeclaration(exportName);
    if (variableDeclaration?.isExported()) {
      return [exportName, variableDeclaration] as const;
    }
  }

  // fall back to all exported declarations in case of re-exports or other edge cases
  const exportedDeclaration = sourceFile
    .getExportedDeclarations()
    .get(exportName)?.[0];

  if (exportedDeclaration) {
    return [exportName, exportedDeclaration] as const;
  }

  throw new Error(
    `❌ drizzle-zero: No config type found in the config file - did you export \`default\` or \`schema\`? Found: ${sourceFile
      .getVariableDeclarations()
      .map(v => v.getName())
      .join(', ')}`,
  );
}
