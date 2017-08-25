import { inject, observable } from 'aurelia-framework';
import { Documents } from 'services/Documents';

class Document {
  @observable title;
  @observable content;

  constructor(props) {
    Object.assign(this, props);
    this.dirty = false;
  }

  titleChanged() {
    this.dirty = true;
  }

  contentChanged() {
    this.dirty = true;
  }
}

@inject(Documents)
export class Editor {
  constructor(documents) {
    this.docService = documents;
    this.docs = [];
    this.currentDoc = {};
    this.loadedDoc = false;

    this.refreshDocs();
  }

  get empty() {
    return !this.docs.length;
  }

  get canCreate() {
    return !!this.currentDoc.title;
  }

  get isDirty() {
    return this.currentDoc.dirty;
  }

  refreshDocs() {
    return this.docService.getAll()
      .then(docs => {
        this.docs = docs.map(d => new Document(d));
      });
  }

  setDoc(id) {
    this.refreshDocs()
      .then(() => {
        const index = this.docs.reduce((d, c, i) => {
          if (d === -1 && c.id === id) return i;
          return d;
        }, -1);

        if (index === -1) throw new Error('Invalid doc id');

        this.currentDoc = this.docs[index];
        this.loadedDoc = true;
      });
  }

  startNew() {
    this.loadedDoc = false;
    this.currentDoc = {};
  }

  importFile() {

  }

  save() {
    console.log(this.currentDoc);
    this.docService.update(this.currentDoc.id, this.currentDoc)
      .then((updated) => {
        return this.refreshDocs()
          .then(() => this.setDoc(updated.id));
      });
  }

  create() {
    this.currentDoc.format = 'churchCircles';
    this.docService.create(this.currentDoc)
      .then(created => {
        return this.refreshDocs()
          .then(() => this.setDoc(created.id));
      });
  }

  delete(id, $event) {
    const currentId = this.currentDoc.id;
    $event.stopPropagation();

    this.docService.delete(id)
      .then(() => this.refreshDocs())
      .then(() => () => {
        if (currentId === id) this.startNew();
        else return this.setDoc(currentId);
      });
  }
}
