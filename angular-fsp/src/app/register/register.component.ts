import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { markAllControlsAsDirty } from '../_utils/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  loading = false;
  accessDenied = false;
  errorMessage: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      { validator: this.confirmedValidator('password', 'confirmPassword') }
    )

  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.errorMessage = ''
    if (this.form.valid) {
      const { name, email, password } = this.form.value;
      console.log(name, email, password)
      this.loading = true;
      this.userService.register({ email, nome: name, senha: password }).subscribe(
        {
          next: response => {
            console.log('next', email, password)
            this.authService.login({ email, senha: password }).pipe(first()).subscribe({
              next: () => {
                this.router.navigateByUrl('/user');
                this.loading = false;
              }
            })

          },
          error: error => {
            console.log(error.error.message)
            this.errorMessage = error.error?.message ? error.error.message : 'An error ocurred on register service.'
            this.loading = false;
          }
        }
      )
    }
    else
      markAllControlsAsDirty(this.form)
  }

}