import { inject } from 'aurelia-framework';
import { Http } from 'services/http';

@inject(Http)
export class Documents {
  constructor(http) {
    this.http = http;
  }

  getAll() {
    return this.http.get('/documents');
  }

  create(body) {
    return this.http.post('/documents', body);
  }

  get(id) {
    return this.http.get(`/documents/${id}`);
  }

  update(id, body) {
    return this.http.put(`/documents/${id}`, body);
  }

  delete(id) {
    return this.http.delete(`/documents/${id}`);
  }
}
