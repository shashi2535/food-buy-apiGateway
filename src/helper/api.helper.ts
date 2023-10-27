import axios from 'axios';
import { configs } from './../config/config';

export class ApiHandler {
  private baseUrl = configs.ORDER_SERVICE_URL;

  public async query(query: string, queryName: string, variables: unknown = {}) {
    const { data: response } = await axios.post(this.baseUrl, {
      query,
      variables,
    });
    return response?.data[queryName];
  }
}
