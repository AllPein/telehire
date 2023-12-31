import { TOKEN_NAME } from '@/constants/localStorage';
import { Token } from '@/models/User';

const localStorageToken = localStorage.getItem(TOKEN_NAME);

export const token: Token | null = localStorageToken
  ? JSON.parse(localStorageToken)
  : null;

export function tokenAlive(token: Token | null) {
  return token && token.tokenExpires > Date.now();
}
