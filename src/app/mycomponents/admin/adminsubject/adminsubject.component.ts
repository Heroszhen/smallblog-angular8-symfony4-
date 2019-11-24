import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../../services/myapi.service';
import {Router} from "@angular/router";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-adminsubject',
  templateUrl: './adminsubject.component.html',
  styleUrls: ['./adminsubject.component.css']
})
export class AdminsubjectComponent implements OnInit {
  page = "adminsubject";
  mobileversion = false;
  showadminnav = false;
  uploaddir;

  subjectform1;
  constructor(private myapi:MyapiService,private router:Router) { 
    var isconnected = this.myapi.isconnected$.getValue();
    if(isconnected.length == 0 || isconnected[0] != true)this.router.navigate(["/"]);
    this.uploaddir = this.myapi.uploaddir$.getValue()[0];
    this.getForm1();
  }

  ngOnInit() {
  }

  //about adminnav
  checkinnerWidth(){
    var innerWidth = window.innerWidth;
    if(innerWidth <= 768){
      this.mobileversion = true;
      this.showadminnav = false;
    }else{
      this.mobileversion = false;
      this.showadminnav = true;
    }
  }
  onResize($event){
    this.checkinnerWidth();
  }

  opennav(){
    this.showadminnav = true;
  }
  closenav(){
    this.showadminnav = false;
  }

  //beginning
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '4',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
  };

  getForm1(){
    this.subjectform1 = new FormGroup({
      title: new FormControl(''),
      plot: new FormControl(''),
    });
  }
}
