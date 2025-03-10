// import { RegisterService } from './../../services/register.service';
// // register.component.ts
// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// //import { RegisterService } from '../../services/register.service';
// import { passwordMatchValidator } from '../../shared/password-match.directive';
// import { user } from '../../services/user';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   public userObj: any;
//   registerForm = this.fb.group({
//     firstName: ['', Validators.required],
//     lastName: ['', Validators.required],
//     username: ['', Validators.required],
//     password: ['', Validators.required],
//     confirmPassword: ['', Validators.required],
//     phoneNumber: ['', Validators.required],
//     emailAddress: ['', [Validators.required, Validators.email]],
//     address: ['', Validators.required]
//   }, {
//     validators: passwordMatchValidator
//   });
//   RegisterService: any;
//   json: string | undefined;

//   constructor(
//     private fb: FormBuilder,
//     RegisterService : RegisterService
//   ) {}

//   get firstName() {
//     return this.registerForm.controls['firstName'];
//   }

//   get lastName() {
//     return this.registerForm.controls['lastName'];
//   }

//   get username() {
//     return this.registerForm.controls['username'];
//   }

//   get password() {
//     return this.registerForm.controls['password'];
//   }

//   get confirmPassword() {
//     return this.registerForm.controls['confirmPassword'];
//   }

//   get phoneNumber() {
//     return this.registerForm.controls['phoneNumber'];
//   }

//   get email() {
//     return this.registerForm.controls['emailAddress'];
//   }

//   get address() {
//     return this.registerForm.controls['address'];
//   }

//   signup(formData: any) {
//     console.log(formData); 
//     const newUser: user = {
//       userId: 0, // Assuming this will be generated by the backend
//       username: formData.username,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       address: formData.address,
//       passwordHash: formData.password,
//       emailAddress: formData.emailAddress,
//       phoneNumber: formData.phoneNumber,
//       status: 'Active' // Assuming all new users are active
//     };
//     this.json = JSON.stringify(newUser);
//     console.log(this.json);
//     this.RegisterService.register(this.json)
//       .subscribe(
//         (response: any) => {
//           console.log('User signed up successfully!', response);
//           // Handle success, e.g., redirect to login page
//         },
//         (error: any) => {
//           console.error('Error signing up:', error);
//           // Handle error, e.g., display error message
//         }
//       );
//   }
// }


import { RegisterService } from './../../services/register.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { user } from '../../services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  get firstName() {
    return this.registerForm.controls['firstName'];
  }

  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get phoneNumber() {
    return this.registerForm.controls['phoneNumber'];
  }

  get email() {
    return this.registerForm.controls['emailAddress'];
  }

  get address() {
    return this.registerForm.controls['address'];
  }

  signup(formData: any) {
     formData = this.registerForm.value;
    const newUser: user = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      passwordHash: formData.password,
      emailAddress: formData.emailAddress,
      phoneNumber: formData.phoneNumber,
      status: 'Active',
      userId: undefined,
      role: {
        roleId: 2,
        roleName: undefined
      },
      token: undefined
    };
  
    this.registerService.register(newUser)
  .subscribe(
    (response: any) => {
      console.log('Response from backend:', response);
      if (typeof response === 'string' && response.startsWith('User created/updated successfully')) {
        console.log('User signed up successfully!');
        alert('User signed up successfully!');
        // Redirect to the dashboard page
        // this.router.navigate(['/dashboard']);
      } else {
        console.error('Unexpected response from backend:', response);
        alert('Unexpected response from backend');
      }
    },
    (error: any) => {
      console.error('Error signing up:', error);
      // Handle error, e.g., display error message
      alert('Error signing up: ' + error.message);
    }
  );
  }
  
}