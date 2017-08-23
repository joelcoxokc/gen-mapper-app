import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, observable } from 'aurelia-framework';
import { Http } from 'services/http';

function setEntity(d) {
    d.entityType = d.entityType || 'documents';
}

@inject(EventAggregator, Http)
export class FileService {

    @observable current = null;

    @observable list = null;

    constructor(eventAggregator: EventAggregator, http: Http) {
        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    currentChanged(file) {
        this.eventAggregator.publish('file-changed', file);
    }

    all() {
        return this.http.getDocuments().then(list => {
            this.list = list;
            console.log(this.list)
            return this.list;
        })
    }

    create(doc) {
        setEntity(doc);
        return this.http.create(doc);
    }

    update(doc) {
        setEntity(doc);
        console.log(doc)
        return this.http.update(doc)
    }

    delete(doc) {
        setEntity(doc)
        return this.http.delete(doc)
    }

    select(doc) {
        this.current = doc;
    }
}



function getDocuments() {
    return [
        { name: 'Document 1'},
        { name: 'Document 2'},
        { name: 'Document 3'},
        { name: 'Document 4'},
        { name: 'Document 5'},
        { name: 'Document 6'},
        { name: 'Document 7'},
    ]
}
