import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const createAPI = (): AxiosInstance => axios.create({
  baseURL: BACKEND_URL,
});