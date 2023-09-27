import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { useEffect } from 'react';

type Props = {
  onClick?: (event: any) => void;
};

export function useBackButton({ onClick }: Props) {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.onEvent('backButtonClicked', onClick);

    return () => {
      tg.offEvent('backButtonClicked', onClick);
    };
  }, [onClick]);

  useMount(() => {
    if (tg.isVersionAtLeast('6.1')) {
      tg.BackButton.isVisible = true;
    }
  });

  return;
}
