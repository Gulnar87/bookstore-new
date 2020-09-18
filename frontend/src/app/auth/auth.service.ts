
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap} from 'rxjs/operators';




interface User {
	displayName?: string;
	uid?: string;
	email?: string;
	photoURL?: string;	
}


@Injectable()

export  class AuthService {

	token: string;
	user: Observable<User>;
	signoutMessage = false;
	signinMessage = false; 
	signinError: any;
	signupError: any;
	passwordError: any;
	passwordSuccess: any;
	
	 constructor(private router: Router,
	 	         private afAuth: AngularFireAuth,
	 	         private afs: AngularFirestore,
	 	         private afDatabase: AngularFireDatabase,
	 	        
	 	        
	 	         ) {


			     this.user = this.afAuth.authState
			      .pipe(switchMap( user => {
			      	if(user) {
			      		return this.afDatabase.object<User>(`users/${user.uid}`).valueChanges()
			      	} else {
			      		return of(null)
			      	}

			      })

			     )  

	}



googleLogin(){
 	const provider = new auth.GoogleAuthProvider() 
 	return this.oAuthLogin(provider);

 }

 facebookLogin(){
 	const provider = new auth.FacebookAuthProvider() 
 	return this.oAuthLogin(provider);
 }

private oAuthLogin(provider){
	return this.afAuth.auth.signInWithPopup(provider)
	.then((credential) => {
        this.updateUserData(credential.user)
          console.log('this is my credentials' + credential.user.displayName)

        	 this.router.navigate(['/']);
        	  this.signinMessage = true;
              setTimeout(()=> { this.signinMessage = false}, 5000);
              auth().currentUser.getIdToken()	  
			  .then(
              (token: string) => {this.token = token
              
              }

              )
      })

}


 private updateUserData(user: User){

	const userRef: AngularFireObject<User> = this.afDatabase.object(`users/${user.uid}`);
	const data: User = {
		displayName: user.displayName,
		uid: user.uid,
		email: user.email,
		photoURL: user.photoURL			
	}

	return userRef.set(data);

}


signupUser(email: string, password: string, displayName: string, photoURL: string){
   this.afAuth.auth.createUserWithEmailAndPassword(email, password)
	.then(credential=> {
       this.router.navigate(['/']);
	  

	  auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL || "http://getdangoodman.com/wp-content/uploads/2010/01/300.Avatar.Saldana.Worthington.lc.121409.jpg"
     

}).then(()=> {

       this.updateUserData( credential.user)
        auth().currentUser.getIdToken()	  
				 .then(
              (token: string) => {this.token = token
              
               }
              )    
})
     })
  	 
      	.catch(
			error => {this.signupError = error, console.log(error)}
			);			

	}



	signinUser(email: string, password: string){
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
		.then(
			response  => {		
			 this.router.navigate(['/']);
        	 this.signinMessage = true;
             setTimeout(()=> { this.signinMessage = false}, 5000);	

			  auth().currentUser.getIdToken()	  
				 .then(
              (token: string) => {this.token = token
              
              }

              )
		
			   }	
			)
		.catch(
			error => {this.signinError = error, console.log(error)}

			);
}
	

signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
        this.signoutMessage = true;
        setTimeout(()=> { this.signoutMessage = false}, 5000);
       
    });
  }


	// logout(){
	// 	auth().signOut();
	// 	this.token = null;
	// }

	getToken(){
		// auth().currentUser.getIdToken()
		// .then(
		// 	(token: string) => this.token = token
		// 	);

		return this.token;
	}


	isAuthenticated() {
    
    return this.token != null;
	const user = auth().currentUser;
    if (user) {
      return true;
    }
    else {
      return false;
    }

	}


	resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then( () => 	{this.passwordSuccess = true,
      	alert ('it is a sucess')}
      	)

      .catch( error => {this.passwordError = error, console.log(error)}
     
      	);
  }



}