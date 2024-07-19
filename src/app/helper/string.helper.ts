export const convertCamelCaseToReadable = (camelCaseString: string) => {
  // Add a space before each uppercase letter
  const withSpaces = camelCaseString.replace(/([A-Z])/g, ' $1');
  // Capitalize the first letter and return the result
  return withSpaces.charAt(0).toUpperCase() + withSpaces?.toLowerCase().slice(1);
};
