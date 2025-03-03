export function authError(message: string): Error {
  const err = new Error(message);

  err.name = "AuthError";

  return err;
}
