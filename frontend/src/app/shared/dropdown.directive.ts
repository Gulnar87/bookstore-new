import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('mouseenter') toggleOpen() {
    this.isOpen = true;
  }

  @HostListener('mouseleave') toggleOpen2() {
   this.isOpen = false;
}
}
