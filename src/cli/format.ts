import {pathToFileURL} from 'node:url';

class PrettierNotFoundError extends Error {
  constructor() {
    super(
      '⚠️  drizzle-zero: prettier could not be found. Install it locally with\n  npm i -D prettier',
    );
    this.name = 'PrettierNotFoundError';
  }
}

export async function loadPrettier() {
  try {
    return await import('prettier');
  } catch (_) {}

  try {
    const path = require.resolve('prettier', {paths: [process.cwd()]});
    return await import(pathToFileURL(path).href);
  } catch {
    throw new PrettierNotFoundError();
  }
}

export async function formatSchema(
  schema: string,
  filePath: string,
): Promise<string> {
  let prettier: Awaited<ReturnType<typeof loadPrettier>>;

  try {
    prettier = await loadPrettier();
  } catch (error) {
    if (!(error instanceof PrettierNotFoundError)) {
      throw error;
    }

    console.warn('⚠️  drizzle-zero: prettier not found, skipping formatting');
    return schema;
  }

  // Anything past this point is prettier failing on input it was given, not
  // prettier being absent. Reporting it as "not found" would hide a broken
  // prettier config behind output that silently differs from every other run.
  const prettierOptions = await prettier.resolveConfig(filePath);

  return prettier.format(schema, {
    ...prettierOptions,
    parser: 'typescript',
  });
}
