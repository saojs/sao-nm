export default function main (input, options = {}) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be string');
  }

  return `${input} & ${options.postfix || 'rainbow'}`;
}
