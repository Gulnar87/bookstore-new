export class User {

	public fullName: string;
	public phoneNumber: number;
	public emailAddress: string;
	public city: string;
	

  constructor(
  	name: string, phone: number, email: string, city: string){
	this.fullName = name;
	this.phoneNumber = phone;
	this.emailAddress = email;
	this.city = city;
  }

}