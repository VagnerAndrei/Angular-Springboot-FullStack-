import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthenticationService ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  loading=false;
  submitted=false;

  constructor(private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    })
  }

  get f(){
    return this.form.controls;
  }

  onSubmit():void{
    // this.authService.login(this.f['username'].value , this.f['password'].value)
  }

}
