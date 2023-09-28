import { useMemo } from 'react';

const tg = (window as any).Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.onClose();
  };

  const user = useMemo(() => tg.initDataUnsafe.user, []);

  return {
    onClose,
    tg,
    user,
  };
}
