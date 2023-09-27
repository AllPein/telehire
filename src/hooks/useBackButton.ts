import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';

type Props = {
  onClick?: (event: any) => void;
};

export function useBackButton({ onClick }: Props) {
  const { tg } = useTelegram();

  useMount(() => {
    tg.onEvent('backButtonClicked', onClick);

    if (tg.isVersionAtLeast('6.1')) {
      tg.BackButton.isVisible = true;
    }

    return () => {
      tg.offEvent('backButtonClicked', onClick);
    };
  });

  return;
}
