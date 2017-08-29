import { customElement, inject } from 'aurelia-framework';
import { Documents } from 'services/documents';

@customElement('texteditor')
@inject(Element, Documents)
export class TextEditor {
  constructor(element, documents) {
    this.element = element;
    this.documents = documents;
  }
}
