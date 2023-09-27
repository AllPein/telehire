import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';

type Props = {
  text?: string;
  onClick?: (event: any) => void;
};

export function useMainButton({ onClick, text }: Props) {
  const {
    tg: { MainButton },
  } = useTelegram();

  useMount(() => {
    MainButton.onClick = onClick;

    if (text) {
      MainButton.setText(text);
    }

    return () => {
      MainButton.offClick(onClick);
    };
  });

  const onShowButton = () => {
    if (!MainButton.isVisible) {
      MainButton.show();
    }
  };

  const onCloseButton = () => {
    if (MainButton.isVisible) {
      MainButton.hide();
    }
  };

  return {
    onShowButton,
    onCloseButton,
  };
}
