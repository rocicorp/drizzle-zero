import {createHash} from 'node:crypto';
import {describe, expect, it} from 'vitest';
import {checkSignature, computeHash, signContent} from '../src/cli/signature';

describe('computeHash', () => {
  it('should produce a known SHA-256 hex digest', () => {
    // SHA-256 of empty string is well-known
    const hash = computeHash('');
    expect(hash).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  it('should produce correct hash for "hello"', () => {
    const expected = createHash('sha256').update('hello').digest('hex');
    expect(computeHash('hello')).toBe(expected);
  });
});

describe('signContent', () => {
  it('should prepend the signature line', () => {
    const content = '// some generated code\n';
    const signed = signContent(content);
    const firstLine = signed.split('\n')[0]!;
    expect(firstLine).toMatch(
      /^\/\/ @generated drizzle-zero signature:sha256:[a-f0-9]{64}$/,
    );
  });

  it('should preserve the original content after the signature line', () => {
    const content = '// some generated code\nconst x = 1;\n';
    const signed = signContent(content);
    const afterFirstLine = signed.slice(signed.indexOf('\n') + 1);
    expect(afterFirstLine).toBe(content);
  });
});

describe('checkSignature', () => {
  it('should return "valid" for content signed by signContent', () => {
    const content = '// generated\nconst x = 1;\n';
    const signed = signContent(content);
    expect(checkSignature(signed)).toBe('valid');
  });

  it('should return "modified" when content is tampered after signing', () => {
    const content = '// generated\nconst x = 1;\n';
    const signed = signContent(content);
    const tampered = signed + '// extra line\n';
    expect(checkSignature(tampered)).toBe('modified');
  });

  it('should return "modified" when signature hash is wrong', () => {
    const fake =
      '// @generated drizzle-zero signature:sha256:0000000000000000000000000000000000000000000000000000000000000000\nsome content\n';
    expect(checkSignature(fake)).toBe('modified');
  });

  it('should return "no-signature" for content without a signature line', () => {
    const content = '// This file was automatically generated\nconst x = 1;\n';
    expect(checkSignature(content)).toBe('no-signature');
  });

  it('should return "no-signature" for content with no newline', () => {
    expect(checkSignature('single line no newline')).toBe('no-signature');
  });

  it('round-trips correctly', () => {
    const original = 'const schema = {};\nexport default schema;\n';
    const signed = signContent(original);
    expect(checkSignature(signed)).toBe('valid');
  });
});
