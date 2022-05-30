import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  acceptedTypes: string
  files:[]

  @ViewChild('uploader')
  uploader: ElementRef

  @Input() public imageSrc:string;
  @Output() public imageChangeHandler = new EventEmitter()

  imageLoaded=false

  constructor() { }

  ngOnInit(): void {
  }

  fileUploadChangeHandler(event) {
    const reader = new FileReader();
    console.log(this.uploader)
    if (event.target.files && event.target.files.length) {
      this.files = event.target.files
      const [file] = event.target.files;
      if (file) {

        reader.readAsDataURL(file);

        reader.onload = () => {

          this.imageSrc = reader.result as string;

        };

        this.imageChangeHandler.emit(file)
      }

    }

  }

  imageError(){
    this.imageSrc = null;
  }

  onComplete(){
    this.imageLoaded=true
  }

  delete() {
    this.imageLoaded = false;
    this.uploader.nativeElement.value =''
    this.imageSrc = null
    this.imageChangeHandler.emit(null)
  }

}
