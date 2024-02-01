import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {


  registrationForm!: FormGroup;
  user: User;
  userSubmitted: boolean;
  constructor(private fb: FormBuilder, private  userService:UserService) { }


  ngOnInit(): void {
    //this.registrationForm = new FormGroup({
    //  userName: new FormControl('Mark', Validators.required),
    //  email: new FormControl(null, [Validators.required, Validators.email]),
    //  password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //  confirmPassword: new FormControl(null, [Validators.required]),
    //  mobile: new FormControl(null, [Validators.required, Validators.minLength(10)])
    //});
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.minLength(10)]]
    }, { validators: this.passwordmatchingValidator });
  }


  passwordmatchingValidator(fg: FormGroup): Validators {
    return fg?.get('password')?.value === fg?.get('confirmPassword')?.value ? null : { notmatched: true };
  }

  get getUserName() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get getPassword() {
    return this.registrationForm.get('password') as FormControl;
  }
  get getEmail() {
    return this.registrationForm.get('email') as FormControl;
  }
  get getCPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get getMobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }
  onSubmit() {
    console.log(this.registrationForm);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      //this.user = Object.assign(this.user, this.registrationForm.value);
      
      //localStorage.setItem('user', JSON.stringify(this.user));
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
    }
  }

  userData(): User {
    return this.user = {
      userName: this.getUserName.value,
      email: this.getEmail.value,
      password: this.getPassword.value,
      mobile: this.getMobile.value

    }
  }

}
