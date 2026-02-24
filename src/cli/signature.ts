import {createHash} from 'node:crypto';

const SIGNATURE_PREFIX = '// @generated drizzle-zero signature:sha256:';

export function computeHash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function signContent(content: string): string {
  const hash = computeHash(content);
  return `${SIGNATURE_PREFIX}${hash}\n${content}`;
}

export function checkSignature(
  fileContent: string,
): 'valid' | 'modified' | 'no-signature' {
  const newlineIndex = fileContent.indexOf('\n');
  if (newlineIndex === -1) {
    return 'no-signature';
  }

  const firstLine = fileContent.slice(0, newlineIndex);
  if (!firstLine.startsWith(SIGNATURE_PREFIX)) {
    return 'no-signature';
  }

  const storedHash = firstLine.slice(SIGNATURE_PREFIX.length);
  const rest = fileContent.slice(newlineIndex + 1);
  const computedHash = computeHash(rest);

  return storedHash === computedHash ? 'valid' : 'modified';
}
