import MyRequest from './request';
import {BASEURL, TIMEOUT} from './config';
export const Request = new MyRequest({
  baseURL: BASEURL,
  timeout: TIMEOUT,
});