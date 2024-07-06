export default function assertIsError(error: unknown): asserts error is Error {
  try {
    if (!(error instanceof Error)) {
      throw error;
    }
  } catch (err) {}
}
