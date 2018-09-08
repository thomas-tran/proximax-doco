import { Component, OnInit } from '@angular/core';
import {
  RemoteUploadService,
  UploadTextRequest,
  ResourceHashMessage,
  MessageType
} from 'xpx-typescript-angular-sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  uploadForm: FormGroup;
  uploaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: RemoteUploadService
  ) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      keywords: [''],
      metadata: [''],
      uploadResult: ['']
    });
  }

  get f() {
    return this.uploadForm.controls;
  }

  onUpload() {
    this.uploaded = true;

    // stop here if form is invalid
    if (this.uploadForm.invalid) {
      return;
    }

    const title = this.f.title.value;
    const contentType = 'text/plain';
    const encoding = 'utf-8';
    const message = this.f.message.value;
    let keywords = '';
    let metadata = '';

    if (this.f.metadata.value.length > 0) {
      metadata = JSON.stringify(this.f.metadata.value);
    }

    if (this.f.keywords.value.length > 0) {
      keywords = this.f.keywords.value;
    }

    const payload: UploadTextRequest = {
      name: title,
      contentType: contentType,
      encoding: encoding,
      keywords: keywords,
      metadata: metadata,
      text: message,
      messageType: MessageType.PLAIN,
      senderPrivateKey: '',
      recieverPublicKey: ''
    };

    this.uploadService.uploadText(payload).subscribe(
      result => {
         const rhm: ResourceHashMessage = result;
        console.log(rhm);
        this.f.uploadResult.setValue(rhm.hash());
      },
      error => {
        console.log(error);
      }
    );
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
