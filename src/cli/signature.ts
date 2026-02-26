import {createHash} from 'node:crypto';

const SIGNATURE_PREFIX = '// @generated drizzle-zero signature:sha256:';
const INPUTS_MARKER = ' inputs:sha256:';

export function computeHash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function signContent(
  content: string,
  inputsHash?: string,
): string {
  const hash = computeHash(content);
  const inputsSuffix = inputsHash ? `${INPUTS_MARKER}${inputsHash}` : '';
  return `${SIGNATURE_PREFIX}${hash}${inputsSuffix}\n${content}`;
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

  // Extract just the signature hash (before any inputs marker)
  const afterPrefix = firstLine.slice(SIGNATURE_PREFIX.length);
  const inputsIndex = afterPrefix.indexOf(INPUTS_MARKER);
  const storedHash =
    inputsIndex >= 0 ? afterPrefix.slice(0, inputsIndex) : afterPrefix;

  const rest = fileContent.slice(newlineIndex + 1);
  const computedHash = computeHash(rest);

  return storedHash === computedHash ? 'valid' : 'modified';
}

export function extractInputsHash(
  fileContent: string,
): string | null {
  const markerIndex = fileContent.indexOf(INPUTS_MARKER);
  if (markerIndex < 0) {
    return null;
  }

  const hashStart = markerIndex + INPUTS_MARKER.length;
  const lineEnd = fileContent.indexOf('\n', hashStart);
  return lineEnd >= 0
    ? fileContent.slice(hashStart, lineEnd)
    : fileContent.slice(hashStart);
}
