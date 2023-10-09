import { ClsStore } from 'nestjs-cls';

export interface AppClsStore extends ClsStore {
  user: {
    id: number;
    telegramId: number;
    authorized: boolean;
  };
}
