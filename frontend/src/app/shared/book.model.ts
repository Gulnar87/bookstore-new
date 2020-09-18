import { User } from "./user.model";


export class Book {
	public title: string;
	public author: string;
	public imagePath: string;
	public description: string;
	public price: number;
	public user: User;

	

  constructor(title: string, author: string, imagePath: string, desc: string,  price: number, user: User
  	){
	this.title = title; 
	this.author = author;
	this.description = desc; 
	this.imagePath = imagePath;
	this.price = price;
	this.user = user;

  }

}

