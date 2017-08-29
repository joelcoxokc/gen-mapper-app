import { inject } from 'aurelia-framework';
import { Documents } from 'services/documents';

@inject(Documents)
export class Tool {
  canPersist = true;

  constructor(documents) {
    this.documents = documents;
  }
}
