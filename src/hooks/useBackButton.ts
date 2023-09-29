import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { history } from '@/utils/history';
import { useEffect } from 'react';

export function useBackButton() {
  const { tg } = useTelegram();

  useEffect(() => {}, []);

  useMount(() => {
    tg.BackButton.show();
    const onClick = () => history.push('/');
    tg.onEvent('backButtonClicked', onClick);

    return () => {
      tg.offEvent('backButtonClicked', onClick);
    };
  });

  return;
}
