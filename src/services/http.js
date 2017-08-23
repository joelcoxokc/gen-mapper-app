import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { Entity } from 'shared/entity';

function handleError(err) {
    console.log(err);
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

    getAll(url: string) {
        return this.http
            .get(url)
            .then(d => d.content)
            .catch(handleError)
    }

    getDocuments(format) {
        return this.getAll('documents')
            .then(d => {
                return d.data.map(item => {
                    item.entityType = 'documents';
                    return item;
                })
            });
    }

    create(entity: Entity = null) {
        return this.http
            .post(entity.entityType, entity)
            .catch(handleError)
    }

    update(entity: Entity = null) {
        const url = `${entity.entityType}/${entity.id}`;
        return this.http
            .put(url, entity)
            .catch(handleError)
    }

    delete(entity: Entity = null) {
        const url = `${entity.entityType}/${entity.id}`;
        return this.http
            .delete(url)
            .catch(handleError);
    }
}