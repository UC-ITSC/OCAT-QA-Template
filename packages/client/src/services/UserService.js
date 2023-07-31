import Cookies from 'universal-cookie';
import Axios from '../utils/http.config';

const cookies = new Cookies();

export class UserService {
  static login(credentials) {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.post(`/user/login`, { credentials })
        .then((response) =>
        {
          const { data } = response.data;

          if (!data.accessToken) {
            alert(`Unable to log in`);
          }

          localStorage.clear();
          localStorage.setItem(`user-token`, data.accessToken);
          window.location.href = `/dashboard`;

        });

    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
