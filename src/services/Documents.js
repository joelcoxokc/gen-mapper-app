
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
  requested = false;
  docs = [];
  _current = {};
  current = new Document();

  get empty() {
    return this.requested && !this.docs.length;
  }

  constructor(documentsApi) {
    this.api = documentsApi;

    this.api.getAll()
      .then(docs => this.docs = docs)
      .then(() => this.changeCurrent(this.docs[0]))
      .then(() => this.requested = true);
  }

  delete(doc, $event) {
    $event.stopPropagation();
    this.docs.splice(this.docs.indexOf(doc), 1);
    this.api.delete(doc.id)
      .then(() => {
        if (doc === this._current) this.changeCurrent(this.docs[0]);
      });
  }

  create() {
    this.api.create({
      format: 'churchCircles',
      title: 'New Document'
    })
      .then((doc) => this.docs.unshift(doc))
      .then(() => this.changeCurrent(this.docs[0]));
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
    if (document) {
      this._current = document;
      this.current.assign(document);
    }
  }
}
