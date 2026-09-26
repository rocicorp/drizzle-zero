import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import {afterAll, beforeAll, describe, expect, test} from 'vitest';
import {formatSchema} from '../src/cli/format';

describe('formatSchema', () => {
  test('formats the schema with prettier', async () => {
    const formatted = await formatSchema(
      'export const   schema={a:1}',
      'zero-schema.gen.ts',
    );

    expect(formatted).toBe('export const schema = {a: 1};\n');
  });

  describe('with an unreadable prettier config', () => {
    let directory: string;

    beforeAll(async () => {
      directory = await fs.mkdtemp(
        path.join(os.tmpdir(), 'drizzle-zero-prettier-'),
      );
      await fs.writeFile(path.join(directory, '.prettierrc'), '{not json');
    });

    afterAll(async () => {
      await fs.rm(directory, {recursive: true, force: true});
    });

    test('reports the failure instead of skipping formatting', async () => {
      // This used to be caught alongside "prettier is not installed" and
      // reported as such, writing an unformatted schema whose signature
      // differed from every correctly formatted run.
      await expect(
        formatSchema(
          'export const schema = {a: 1};',
          path.join(directory, 'zero-schema.gen.ts'),
        ),
      ).rejects.toThrow();
    });
  });
});
