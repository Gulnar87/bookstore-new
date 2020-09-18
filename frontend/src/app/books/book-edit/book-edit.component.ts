import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { BookService } from '../book.service';
import { Book } from '../../shared/book.model';
import { faExclamationTriangle, faPlusCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit{
	
  subscription: Subscription; 
  bookForm: FormGroup;
  faExclamationTriangle = faExclamationTriangle;
  faPlusCircle = faPlusCircle;
  faInfoCircle = faInfoCircle;
  
  cities =[ 'Baku', 'Sumqayit', 'Ganja', 'Zagatala', 
            'Quba', 'Shamkir', 'Qazax', 'Xachmaz', 'Qusar'];
 
  id: number;
  submitted = false; 
  editMode = false;
  imageSrc: any;
  forbiddenUsernames = ['Mussolini', 'Osama Bin Laden', 'Hitler'];
	

  constructor(private route: ActivatedRoute,
  	          private bookService: BookService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {

  	this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );

  // fontawesome.library.add(faUpload);

  }

  onSubmit(){
  
  this.submitted = true; 
     
  if(this.editMode && this.bookForm.valid){
      this.bookService.updateBook(this.id, this.bookForm.value)
      this.onSaveBooks()
      this.onCancel();
    } else if (this.bookForm.valid) {
    
       this.bookService.addBook(this.bookForm.value);
        this.onSaveBooks()

       this.onCancel();
    }

     console.log(this.bookForm.value)  

  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm(){
  	let name = '';
  	let email = '';
  	let phone: number;
  	let city = '';
    let bookTitle = '';
  	let bookAuthor = '';
  	let bookDescription = '';
  	let bookImagePath = '';
  	let bookPrice: number;
  	let termsCondt = '';

  	if(this.editMode){
  		const book = this.bookService.getBook(this.id);
  		   name = book.user.fullName;
  	     email = book.user.emailAddress;
  	     phone = book.user.phoneNumber;
  	     city = book.user.city;
         bookTitle = book.title;
  	     bookAuthor = book.author;
  	     bookDescription = book.description;
  	     bookImagePath = book.imagePath;
  	     bookPrice = book.price;
  	     termsCondt = '';
  	}

  	  this.bookForm = new FormGroup({
      'name': new FormControl(name, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'city': new FormControl(city, Validators.required),
      'title': new FormControl(bookTitle, Validators.required),
      'author': new FormControl(bookAuthor, Validators.required),
      'description': new FormControl(bookDescription),
      'imagePath': new FormControl(bookImagePath, Validators.required),
      'price': new FormControl(bookPrice, Validators.required),
      'terms': new FormControl(termsCondt, Validators.required),
      'other': new FormArray([]),
      'phone': new FormArray([ new FormControl(phone, Validators.required)])
    });
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};

    } 
    return null;
  }

 get f() { return this.bookForm.controls; }


onSelectFile(event)  {

    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
}

onAddField(){
  const control = new FormControl(null);
  (<FormArray>this.bookForm.get('other')).push(control);
}

onAddPhone(){
    const control = new FormControl();
  (<FormArray>this.bookForm.get('phone')).push(control);

}

 getControls() {
    return (<FormArray>this.bookForm.get('other')).controls;
  }

   getControls1() {
    return (<FormArray>this.bookForm.get('phone')).controls;
  }


  onSaveBooks(){
  this.dataStorageService.storeBooks()
   
  .subscribe(
    (response) => {
      console.log(response);
       }, (error) => console.log(error)
  );


  
  }

}



      




