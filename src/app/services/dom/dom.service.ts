import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  readonly doc: Document = window.document;

  constructor() { }

  hideElement(selector: string) {
    const elem: HTMLElement = this.doc.querySelector(selector) as HTMLElement;
    elem.style.display = 'none';
  }

  showElement(selector: string) {
    const elem = this.doc.querySelector(selector) as HTMLElement;
    elem.style.display = 'block';
  }

  toggleElement(selector: string) {
    const elem = this.doc.querySelector(selector) as HTMLElement;

    if (elem.style.display === 'none' || !elem.style.display) {
      this.showElement(selector);
      return;
    }

    this.hideElement(selector);
  }

  toggleVisibility(selector: string) {
    const elem = this.doc.querySelector(selector) as HTMLElement;
    elem.classList.toggle('show');
  }
}
