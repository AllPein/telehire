import { AxiosResponse } from 'axios';

import { AxiosClient, IApiService } from '@/services/types';

class ApiService implements IApiService {
  // @ts-ignore
  #axiosClient: AxiosClient;

  get axiosClient() {
    return this.#axiosClient as AxiosClient;
  }

  init(axiosClient: AxiosClient) {
    this.#axiosClient = axiosClient;
  }

  async getToken(): Promise<AxiosResponse<string>> {

    try {
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const initData = params.get('tgWebAppData');
      const res = await this.axiosClient.get<string>(
        '/authenticate',
        {},
        {
          headers: {
            Authorization: 'twa-init-data ' + initData,
          },
        },
      );

      return res;
    } catch (err: any) {
      return err;
    }
  }
}

export const apiService = new ApiService();
