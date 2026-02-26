import {register} from 'tsx/esm/api';

type TsxRegister = ReturnType<typeof register> & {
  import: (specifier: string, parentURL: string) => Promise<any>;
};

let tsxRegister: TsxRegister | undefined;

/**
 * Import a TypeScript module using a shared tsx register instance.
 * Lazily creates a single tsx register on first call, then reuses it
 * for all subsequent imports. This avoids the overhead of creating a
 * new module register per call (which is what `tsImport()` does internally).
 */
export const tsImportShared = (
  specifier: string,
  parentURL: string,
): Promise<any> => {
  tsxRegister ??= register({namespace: 'drizzle-zero'}) as TsxRegister;
  return tsxRegister.import(specifier, parentURL);
};
