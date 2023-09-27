import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';

type Props = {
  text?: string;
  onClick?: (event: any) => void;
};

export function useMainButton({ onClick, text }: Props) {
  const { tg } = useTelegram();

  useMount(() => {
    tg.onEvent('mainButtonClicked', onClick);

    if (text) {
      tg.MainButton.setText(text);
    }

    return () => {
      tg.offEvent('mainButtonClicked', onClick);
    };
  });

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
    onShowButton,
    onCloseButton,
    tg,
  };
}
