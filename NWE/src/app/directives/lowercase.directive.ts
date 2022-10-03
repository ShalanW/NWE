import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appLowercase]'
})
export class LowercaseDirective {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  @HostListener('keyup') onKeyUp() {
    const nativeElement = this.elementRef.nativeElement;
    nativeElement.value = nativeElement.value.toLowerCase();
  }

}


