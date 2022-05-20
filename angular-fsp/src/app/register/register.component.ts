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
    if (this.form.valid) {
      const { name, email, password } = this.form.value;
      this.loading = true;
      this.userService.register({ email, nome: name, senha: password }).subscribe(
        {
          next: () => {

            this.authService.login({ email: '', senha: '' }).pipe(first()).subscribe({
              next: () => {
                this.router.navigateByUrl('/user');
              }
            })

          },
          error: () => {
            this.loading = false;
          }
        }
      )
    }
    else
      markAllControlsAsDirty(this.form)
  }

}