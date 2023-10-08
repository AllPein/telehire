import { useMemo } from 'react';

export function useTelegram() {
  const tg = useMemo(
    () => (window as any).Telegram.WebApp,
    [(window as any).Telegram.WebApp],
  );

  const onClose = () => {
    tg.onClose();
  };

  const user = tg.initDataUnsafe.user;

  return {
    onClose,
    tg,
    user,
  };
}
