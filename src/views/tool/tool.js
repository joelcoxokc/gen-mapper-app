import { observable } from 'aurelia-framework';

export class Tool {
  canPersist = true;
  @observable title = '';
  loaded = '';
  editorDirty = false;
  titleDirty = false;
  content = '';

  titleChanged() {
    this.titleDirty = (this.loaded !== this.title);
  }

  get dirty() {
    return this.editorDirty || this.titleDirty;
  }

  save() {

  }

  load() {

  }
}
