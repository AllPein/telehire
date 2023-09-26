const tg = window.Telegram.WebApp;
tg.MainButton.setText('Create');

export function useTelegram() {
  const onClose = () => {
    tg.onClose();
  };

  const onShowButton = () => {
    if (!tg.MainButton.isVisible) {
      tg.MainButton.show();
    }
  };

  const onCloseButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
  };

  return {
    onClose,
    onShowButton,
    onCloseButton,
    tg,
  };
}
