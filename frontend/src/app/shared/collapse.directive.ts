import { Directive, HostListener, HostBinding } from '@angular/core'

@Directive ({
	selector: '[appCollapse]'

})

export class CollapseDirective {
	@HostBinding('class.collapse') isCollapsed = false; 

	@HostListener('click') collapse(){
		this.isCollapsed = !this.isCollapsed;
		
	}

}