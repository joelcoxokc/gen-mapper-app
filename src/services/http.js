import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { Entity } from 'shared/entity';

function handleError(err) {
  console.log(err.content.message);
}

@inject(HttpClient)
export class Http {
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

  getAll(url: string) {
    return this.http
    .get(url)
    .then(d => d.content)
    .catch(handleError);
  }

  getDocuments(format) {
    return this.getAll('documents')
    .then(d => {
      return d.data.map(item => {
        item.entityType = 'documents';
        return item;
      });
    });
  }

  create(entity: Entity = null) {
    return this.http
    .post(entity.entityType, entity)
    .catch(handleError);
  }

  update(entity: Entity = null) {
    const url = `${entity.entityType}/${entity.id}`;
    return this.http
    .put(url, entity)
    .catch(handleError);
  }

  deleteEntity(entity: Entity = null) {
    const url = `${entity.entityType}/${entity.id}`;
    return this.http
    .delete(url)
    .catch(handleError);
  }
}
