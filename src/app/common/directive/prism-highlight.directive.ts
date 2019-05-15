import { Directive, ElementRef, AfterViewInit, OnInit, Renderer2, Input  } from '@angular/core';
import { highlightElement } from 'prismjs';

@Directive({
  selector: '[snPrismHighlight]'
})
export class PrismHighlightDirective implements AfterViewInit {
  // @Input('snPrismHighlight') prismHighlight;

  // @Input() highlightValue: string;
  @Input() public set highlightValue(highlightValue: string){

    this.el.nativeElement.textContent = highlightValue;
    highlightElement(this.el.nativeElement);
    // console.log(this.el)
  }

  constructor(private el: ElementRef,private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    highlightElement(this.el.nativeElement)
    // this.el.nativeElement.innerHTML = highlight(this.el.nativeElement.textContent, languages.json);
  }
}
