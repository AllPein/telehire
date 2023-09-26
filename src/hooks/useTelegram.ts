const tg = window.Telegram.WebApp;
tg.MainButton.setText('Create');

export function useTelegram() {
  const onClose = () => {
    tg.onClose();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    tg,
  };
}
