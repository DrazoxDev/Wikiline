export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 20_000,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Timeout après ${timeoutMs / 1000}s — ${url}`);
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
