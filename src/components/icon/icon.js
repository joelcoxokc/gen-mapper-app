import { customElement, bindable, inject } from 'aurelia-framework';

@customElement('icon')
@inject(Element)
export class Icon {
    @bindable name: string = null;
    
    constructor(element: Element) {
        this.element = element;
    }

    nameChanged(name) {
        this.element.setAttribute('style', `background-image: url(scripts/icons/${name}.svg)`);
    }
}