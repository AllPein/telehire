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

  async getToken(): Promise<string> {
    try {
      const hash = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const initData =
        params.get('tgWebAppData') ||
        'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';
      const res = await this.axiosClient.get<{ token: string }>(
        '/authenticate',
        {},
        {
          headers: {
            Authorization: 'twa-init-data ' + initData,
          },
        },
      );

      console.log(res);

      return res.data.token as string;
    } catch (err: any) {
      return err;
    }
  }
}

export const apiService = new ApiService();
