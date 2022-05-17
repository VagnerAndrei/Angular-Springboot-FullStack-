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
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log(this.f['username'].value, this.f['password'].value)
    this.authService.login({ email: this.f['username'].value, senha: this.f['password'].value }).pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          // this.alertService.error(error);
          console.log(error)
          this.loading = false;
        }
      });
  }

}
