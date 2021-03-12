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
  public bookForm: FormGroup;
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

  public book: Book = new Book();
	

  constructor(private route: ActivatedRoute,
  	          private bookService: BookService,
              private router: Router) { }

  ngOnInit() {

  	this.route.paramMap.subscribe(
        (params) => {
          if (params.get('id')) {
            console.log("param")
            this.id = +params.get('id')
            this.bookService.getBook(this.id).subscribe(book=> {
          
              this.book = book;
              this.initForm();
         
              // this.editMode = params['id'] != null;
            })

          } else {
            console.log("empty")
            // this.editMode = params['id'] != null;
            this.initForm();
          }

        }
      );
  // fontawesome.library.add(faUpload);
  }

  onSubmit(){
  
  this.submitted = true; 
     
  if(this.editMode && this.bookForm.valid){
      this.bookService.updateBook(this.id, this.bookForm.value)
   
      this.onSaveBooks(this.bookForm.value)
      this.onCancel();
    } 
    
    else if (this.bookForm.valid) {
    
      this.bookService.addBook(this.bookForm.value);
      this.onSaveBooks(this.bookForm.value)
      this.onCancel();
    }

     console.log(this.bookForm.value)  

  }

  onSaveBooks(book){
    this.bookService.createBook(book)
    .subscribe(
      (response) => {
        console.log(response);
         }, (error) => console.log(error)
    );
    
    }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm(): void{

  	  this.bookForm = new FormGroup({
      name: new FormControl(this.book.user ? this.book.user.fullName : '', [Validators.required, this.forbiddenNames.bind(this)]),
      email: new FormControl(this.book.user ? this.book.user.emailAddress : '', [Validators.required, Validators.email]),
      city: new FormControl(this.book.user ? this.book.user.city : '', Validators.required),
      title: new FormControl(this.book.title, Validators.required),
      author: new FormControl(this.book.author, Validators.required),
      description: new FormControl(this.book.description),
      imagePath: new FormControl(this.book.imagePath, Validators.required),
      price: new FormControl(this.book.price, Validators.required),
      terms: new FormControl('', Validators.required),
      phone: new FormControl(this.book.user ? this.book.user.phoneNumber : null, Validators.required)
      // other: new FormArray([]),

    });
  }


  // benefits: this.fb.array(
  //   this.vacancy.jobPerks && this.vacancy.jobPerks.length > 0 ?
  //     [...(this.vacancy.jobPerks).map(jp => this.fb.group({
  //       id: jp.id,
  //       description: [jp.description, Validators.maxLength(75)],
  //     }))] :
  //     [...([new JobPerk(undefined)]).map(jp => this.fb.group({
  //       id: jp.id,
  //       description: [jp.description, Validators.maxLength(75)],
  //     }))]
  // ),

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

  //  getControls1() {
  //   return (<FormArray>this.bookForm.get('phone')).controls;
  // }


}



      




