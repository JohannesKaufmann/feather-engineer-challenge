import QueryString from "qs";

// Makes it simpler for the developer and typescript
// if its always a string...
// There SHOULD be more validation and returning error messages
// to the api consumers.
export const getQueryArgument = (
  query: QueryString.ParsedQs,
  key: string
): string => {
  const val = query[key];

  if (!val) return "";
  if (typeof val !== "string") return "";

  return val;
};
