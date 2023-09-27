import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';

type Props = {
  text?: string;
  onClick?: (event: any) => void;
};

export function useMainButton({ onClick, text }: Props) {
  const { tg } = useTelegram();

  useMount(() => {
    tg.MainButton.onClick = onClick;

    if (text) {
      tg.MainButton.setText(text);
    }

    return () => {
      tg.MainButton.offClick(onClick);
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
