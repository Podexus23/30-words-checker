export const logError = (err: unknown) => {
  if (err instanceof Error) {
    console.error(err.stack);
  } else {
    console.error("Unknown error:", err);
  }
};

export const logWarn = (err: unknown) => {
  console.warn("Unknown error:", err);
};
