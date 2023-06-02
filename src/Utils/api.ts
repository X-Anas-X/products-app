import axios, {Method} from 'axios';
import {API_URL} from '../configs';

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {},
});

type Api_Request = {
  url: string;
  method?: Method;
  data?: {};
  params?: {};
  headers?: {};
  manualTrigger?: boolean;
};

export const apiRequest = async <DATA>(req: Api_Request) => {
  return api.request<DATA>({
    url: req.url,
    method: req.method || 'GET',
    ...(req.data && {data: req.data}),
    ...(req.params && {params: req.params}),
    headers: req.headers,
  });
};
