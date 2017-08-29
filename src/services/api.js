import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';

function handleError(err) {
  console.log(err.content.message);
}

@inject(HttpClient)
export class Api {
  constructor(http: HttpClient) {
    this.http = http;
    this.configure();
  }

  configure() {
    this.http.configure(x => {
      x.withBaseUrl('http://genmap.garrettcox.io');
      x.withHeader('Authorization', 'bearer ' + sessionStorage.getItem('auth_token'));
    });
  }

  get(url) {
    return this.http
      .get(url)
      .then(response => response.content.data)
      .catch(handleError);
  }

  post(url, body) {
    return this.http
      .post(url, body)
      .then(response => response.content.data)
      .catch(handleError);
  }

  put(url, body) {
    return this.http
      .put(url, body)
      .then(response => response.content.data)
      .catch(handleError);
  }

  delete(url) {
    return this.http
      .delete(url)
      .then(response => response.content.data)
      .catch(handleError);
  }
}
