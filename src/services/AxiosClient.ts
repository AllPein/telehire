import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

export class AxiosClient {
  private baseUrl: string | undefined;

  public init(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(
    url: string,
    params?: object,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, unknown>> {
    return axios
      .request<T>({
        url: `${options?.baseURL || this.baseUrl}${url}`,
        method: 'get',
        params: params || {},
        ...options,
      })
      .then((response) => response);
  }

  public async post<T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
    params?: object,
  ): Promise<AxiosResponse<T, unknown>> {
    return axios
      .request<T>({
        url: `${this.baseUrl}${url}`,
        method: 'post',
        data: data || {},
        headers,
        params: params || {},
      })
      .then((response) => response);
  }

  public async sendFormData<T>(
    url: string,
    data: FormData,
    params?: object,
  ): Promise<AxiosResponse<T, unknown>> {
    return axios
      .request<T>({
        url: `${this.baseUrl}${url}`,
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: params || {},
      })
      .then((response) => response);
  }

  public async put<T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AxiosResponse<T, unknown>> {
    return axios
      .request<T>({
        url: `${this.baseUrl}${url}`,
        method: 'put',
        data: data || {},
        headers,
      })
      .then((response) => response);
  }

  public async patch<T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
    params?: object,
  ): Promise<AxiosResponse<T, unknown>> {
    return axios
      .request<T>({
        url: `${this.baseUrl}${url}`,
        method: 'patch',
        data: data || {},
        headers,
        params: params || {},
      })
      .then((response) => response);
  }

  public async delete<T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AxiosResponse<T, unknown>> {
    return axios
      .request<T>({
        url: `${this.baseUrl}${url}`,
        method: 'delete',
        data: data || {},
        headers,
      })
      .then((response) => response);
  }
}
