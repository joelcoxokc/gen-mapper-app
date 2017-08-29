import { inject } from 'aurelia-framework';
import { Api } from 'services/api';

@inject(Api)
export class DocumentsApi {
  constructor(api) {
    this.api = api;
  }

  getAll() {
    return this.api.get('/documents');
  }

  create(body) {
    return this.api.post('/documents', body);
  }

  get(id) {
    return this.api.get(`/documents/${id}`);
  }

  update(id, body) {
    return this.api.put(`/documents/${id}`, body);
  }

  delete(id) {
    return this.api.delete(`/documents/${id}`);
  }
}
