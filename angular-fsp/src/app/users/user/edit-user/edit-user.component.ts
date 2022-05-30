import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadComponent } from 'src/app/_components/image-upload/image-upload.component';
import { SessionService } from 'src/app/_services/session.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  errorMessage: string;
  imageSrc: string;

  private file = undefined;
  private userId: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private sessionService: SessionService) {


  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    })
    this.userId = this.sessionService.userId
    this.loading=true
    this.userService.find(this.userId).subscribe({
      next: user => {
        this.form.patchValue({ name: user.nome, email: user.email })
        this.imageSrc = `${environment.apiUrl}/usuarios/${user.id}/foto`
        this.loading=false
      }
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.loading=true
    const formData: FormData = new FormData()
    if (this.file)
      formData.append('imagem', this.file)
    if (this.file == null)
      formData.append('deleteImagem', 'true')
    formData.append('nome', this.form.value.name)
    formData.append('email', this.form.value.email)
    this.userService.updateUser(formData, this.userId).subscribe({
      next: () => { 
        this.loading=false
        alert('Perfil Atualizado!')
      },
      error: error => {
        this.loading=false
        console.log(error.error.message)
      }
    })
  }

  imageChangeHandler(file) {
    this.file = file
  }

}
