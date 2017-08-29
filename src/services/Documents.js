
import { inject } from 'aurelia-framework';
import { DocumentsApi } from 'services/documentsApi';

class Document {
  _title;
  _content;
  title;
  content;

  get dirty() {
    return (this._title !== this.title || this._content !== this.content);
  }

  assign({ title, content }) {
    this._title = title;
    this.title = title;
    this._content = content;
    this.content = content;
  }
}

@inject(DocumentsApi)
export class Documents {
  docs = [];
  _current = {};
  current = new Document();

  constructor(documentsApi) {
    this.api = documentsApi;

    this.api.getAll()
      .then(docs => this.docs = docs)
      .then(() => this.changeCurrent(this.docs[0]));
  }

  setFormat() {

  }

  saveCurrent() {
    this._current.title = this.current.title;
    this._current.content = this.current.content;
    this.current.assign(this._current);
    this.api.update(this._current.id, {
      title: this._current.title,
      content: this._current.content
    });
  }

  changeCurrent(document) {
    this._current = document;
    this.current.assign(document);
  }
}
