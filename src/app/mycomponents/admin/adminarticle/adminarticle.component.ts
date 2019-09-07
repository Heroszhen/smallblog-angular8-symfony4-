import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../../services/myapi.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminarticle',
  templateUrl: './adminarticle.component.html',
  styleUrls: ['./adminarticle.component.css']
})
export class AdminarticleComponent implements OnInit {
  page = "adminarticle";
  mobileversion = false;
  showadminnav = false;
  allarticles;
  showarticles:boolean = false;
  uploaddir;

  article1 = {
    'id':"-1",
    'title':'',
    'content':'',
    'photo':''
  }
  article1photo:File = null;
  article1photourl:string = "";
  msgalertaddarticle:string = '';
  showform2:boolean = false;

  
  constructor(private myapi:MyapiService,private router:Router) {
    var isconnected = this.myapi.isconnected$.getValue();
    if(isconnected.length == 0 || isconnected[0] != true)this.router.navigate(["/"]);
    this.uploaddir = this.myapi.uploaddir$.getValue()[0];
    this.checkinnerWidth();
    this.getAllArticles();
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

  //and
  getAllArticles(){
    this.myapi.myGet("getallarticles").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allarticles = data["response"];
        this.showarticles = true;
      }
    });
  }

  createOneArticle(){
    if(this.showform2 == true){
      var myform : FormData = new FormData();
      myform.append("id",this.article1.id);
      myform.append("title",this.article1.title);
      myform.append("content",this.article1.content);
      if(this.article1photo != null)myform.append("photo",this.article1photo);
      this.myapi.myPost2(myform,"editonearticle").subscribe((data)=>{
        if(data != null && Object.keys(data).length !== 0){
          this.msgalertaddarticle = "<div class='alert alert-success'>Vos modifications ont été enregistrées avec succès</div>";
          this.article1photo = null;
          if(data["response"] == "done")this.allarticles = data["data"];
        }
      });
    }else{
      var myform : FormData = new FormData();
      myform.append("title",this.article1.title);
      myform.append("content",this.article1.content);
      myform.append("photo",this.article1photo);
      this.myapi.myPost2(myform,"addonearticle").subscribe((data)=>{
        if(data != null && Object.keys(data).length !== 0){
          this.msgalertaddarticle = "<div class='alert alert-success'>Votre article a été ajouté avec succès</div>";
          this.article1photo = null;
        }
      });
    }
    
  }

  handleFileInput(file:FileList){
    this.article1photo = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.article1photourl = event.target.result;
    }
    reader.readAsDataURL(this.article1photo);
  }

  deleteOneArticle(key,id){
    var query = {
      "id":this.allarticles[key].id
    }
    this.myapi.login(query,"deleteonearticle").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allarticles.splice(key,1);
      }
    });
  }

  showForm2(key){
    this.article1.id = this.allarticles[key].id.toString();
    this.article1.title = this.allarticles[key].title;
    this.article1.content = this.allarticles[key].content;
    this.article1.photo = this.allarticles[key].photo;
    this.showform2 = true;
  }
  hideForm2(){
    this.resetArticle1();
    this.showform2 = false;
  }

  resetArticle1(){
    this.article1.id = "-1";
    this.article1.title = "";
    this.article1.content = "";
    this.article1.photo = "";
    this.article1photo = null;
    this.article1photourl = "";
  }
}
