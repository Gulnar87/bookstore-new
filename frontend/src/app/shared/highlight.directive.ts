import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core'

@Directive ({
	selector: '[appHighlight]'

})

export class HighlightDirective implements OnInit {
	@Input() defaultColor: string = 'transparent';
	@Input() highlightColor: string = '#e8e8f2';
	@Input() defaultBorderRadius: string = '0';
	@Input() highlightBorderRadius: string = '2px';



	@HostBinding('style.backgroundColor') backgroundColor: string;
	@HostBinding('style.borderRadius') borderRadius: string;
	@HostBinding('style.opacity') opacity: string;
	

	constructor(){}
	
	ngOnInit(){
	  this.backgroundColor = this.defaultColor;
	  this.borderRadius = this.defaultBorderRadius;

	

	}

 @HostListener('mouseenter') mouseover(eventData: Event){
 	this.backgroundColor = this.highlightColor;
 	this.borderRadius = this.highlightBorderRadius;
 	
 	

 }
 
 @HostListener('mouseleave') mouseleave(eventData: Event){
 	this.backgroundColor = this.defaultColor;
 	this.borderRadius = this.defaultBorderRadius;


 }

}

