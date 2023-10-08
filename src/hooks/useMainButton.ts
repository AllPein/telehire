import { useTelegram } from '@/hooks/useTelegram';
import { useEffect } from 'react';

type Props = {
  text?: string;
  onClick?: (event: any) => void;
  condition: boolean;
  loading?: boolean;
  params?: any;
};

export function useMainButton({
  onClick,
  text,
  condition,
  loading,
  params,
}: Props) {
  const { tg } = useTelegram();

  useEffect(() => {
    if (params) {
      tg.MainButton.setParams(params);
    } else {
      tg.MainButton.setParams({
        color: tg.themeParams.button_color,
      });
    }
    if (text) {
      tg.MainButton.setText(text);
    }

    if (loading) {
      tg.MainButton.showProgress();
    } else {
      tg.MainButton.hideProgress();
    }
    if (onClick) {
      tg.MainButton.onClick(onClick);
    }

    if (condition) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick(onClick);
      tg.MainButton.hide();
    };
  }, [params, loading, onClick, condition, text]);
}
