const tg = (window as any).Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.onClose();
  };

  return {
    onClose,
    tg,
  };
}
