export const generateRandomString = (
  length,
  options: { lower: boolean; upper: boolean; number: boolean } = {
    lower: true,
    upper: false,
    number: false,
  },
) => {
  let characters = '';

  if (options.lower) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (options.upper) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.number) characters += '0123456789';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
