import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/_services/session.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  errorMessage: string

  constructor(private formBuilder: FormBuilder, private userService:UserService, private sessionService:SessionService) { 


  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    })

    this.userService.find(this.sessionService.userId).subscribe({
      next : user => {
        this.form.value.name = user.nome;
        this.form.value.email = user.email;
      }
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() { }
}
