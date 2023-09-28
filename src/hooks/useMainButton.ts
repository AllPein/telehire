import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { useEffect } from 'react';

type Props = {
  text?: string;
  onClick?: (event: any) => void;
};

export function useMainButton({ onClick, text }: Props) {
  const { tg } = useTelegram();

  useMount(() => {
    if (text) {
      tg.MainButton.setText(text);
    }
  });

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onClick);

    return () => {
      tg.offEvent('mainButtonClicked', onClick);
    };
  }, [onClick]);

  const onShowButton = () => {
    if (!tg.MainButton.isVisible) {
      tg.MainButton.show();
    }
  };

  const onHideButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
  };

  return {
    onShowButton,
    onHideButton,
    tg,
  };
}
