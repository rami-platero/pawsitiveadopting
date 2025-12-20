export function extractAuthAction(url?: string): 'send-verification-email' | 'sign-up' | null {
  if (!url) return null;

  const pathname = new URL(url).pathname;
  const parts = pathname.split('/');

  const action = parts[3];

  return action === 'send-verification-email' || action === 'sign-up'
    ? action
    : null;
}
