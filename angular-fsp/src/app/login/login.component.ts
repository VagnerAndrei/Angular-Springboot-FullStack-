import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  loading = false;
  accessDenied = false;

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
      this.authService.login({ email: this.f['email'].value, senha: this.f['password'].value }).pipe(first())
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/user');
            this.loading = false;
          },
          error: error => {
            // this.alertService.error(error);
            console.log(error)
            this.accessDenied = true;
            this.loading = false;
          }
        });
    }
  }

}
