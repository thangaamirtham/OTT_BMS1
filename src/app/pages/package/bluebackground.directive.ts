import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngxBluebackground]'
})
export class BluebackgroundDirective {

  constructor(
    el: ElementRef
  ) {
    el.nativeElement.style.backgroundColor ="blue"
   }

}
