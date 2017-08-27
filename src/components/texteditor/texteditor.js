import { customElement, bindable, inject, observable, bindingMode } from 'aurelia-framework';

@customElement('texteditor')
@inject(Element)
export class TextEditor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) dirty: boolean = false;
  loaded = '';

  constructor(element: Element) {
    this.element = element;
  }

  @observable _content = '';
  _contentChanged() {
    this.dirty = (this.loaded !== this._content);
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  get content() {
    console.log('get');
    this.loaded = this._content;
    return this._content;
  }

  set content(content) {
    console.log('set', content);
    this.loaded = content;
    this._content = content;
  }
}
