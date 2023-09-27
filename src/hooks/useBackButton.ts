import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';

type Props = {
  onClick?: (event: any) => void;
};

export function useBackButton({ onClick }: Props) {
  const {
    tg: { BackButton, isVersionAtLeast },
  } = useTelegram();

  useMount(() => {
    BackButton.onClick = onClick;

    if (isVersionAtLeast('6.1')) {
      BackButton.isVisible = true;
    }

    return () => {
      BackButton.offClick(onClick);
    };
  });

  return;
}
