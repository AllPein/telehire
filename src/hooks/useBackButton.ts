import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { history } from '@/utils/history';
import { useEffect } from 'react';

type OnBackClick = (event: any) => void;

export function useBackButton(onClick?: OnBackClick) {
  const { tg } = useTelegram();

  useEffect(() => {
    const onClickModified = onClick ? onClick : () => history.goBack();
    tg.onEvent('backButtonClicked', onClickModified);

    return () => {
      tg.offEvent('backButtonClicked', onClickModified);
    };
  }, [onClick]);

  useMount(() => {
    if (tg.isVersionAtLeast('6.1')) {
      tg.BackButton.isVisible = true;
    }
  });

  return;
}
