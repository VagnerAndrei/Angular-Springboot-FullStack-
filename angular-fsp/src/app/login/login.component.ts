import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { markAllControlsAsDirty } from '../_utils/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  loading = false;
  accessDenied = false;
  errorMessage: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.accessDenied = false;
      this.errorMessage = ''
      this.authService.login({ email: this.f['email'].value, senha: this.f['password'].value }).pipe(first())
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/user');
            this.loading = false;
          },
          error: error => {
            this.accessDenied = error.status == 403;
            this.errorMessage = error.status == 403 ? '' : 'An error ocurred on login service.'
            this.loading = false;
          }

        });
    }
    else
      markAllControlsAsDirty(this.form)
  }

}
