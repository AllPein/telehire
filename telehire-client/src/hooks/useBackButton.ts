import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';

type Props = {
  onClick?: () => any;
};

export function useBackButton({ onClick }: Props) {
  const { tg } = useTelegram();

  useMount(() => {
    tg.BackButton.show();

    if (onClick) {
      tg.BackButton.onClick(onClick);
    }

    return () => {
      tg.BackButton.offClick(onClick);
    };
  });
}
