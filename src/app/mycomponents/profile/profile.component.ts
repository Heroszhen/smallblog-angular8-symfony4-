import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../services/myapi.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  me;
  isconnected:boolean;
  uploaddir;
  myprofile;
  showprofile:boolean = false;
  showform:boolean = false;

  imageurl:string = "";
  filetoupload: File = null;
  msgalert:string = "";

  allarticles:any = [];
  constructor(private myapi:MyapiService,private router:Router) { 
    this.isconnected = this.myapi.isconnected$.getValue()[0];
    if(this.isconnected != true){
      this.router.navigate(['/']);
    }else{
      this.uploaddir = this.myapi.uploaddir$.getValue()[0];
      this.getProfile();
      this.getAllArticles();
    }
  }

  ngOnInit() {
  }

  getProfile(){
    var user = this.myapi.getCookie("user");
    this.me = JSON.parse(user);
    user = JSON.parse(user);
    var email = user["email"];
    var query = {
      "email":email
    };
    this.myapi.login(query,"getprofile").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.myprofile = data["response"];
        this.showprofile = true;
      }
    });
  }

  modifyprofile(){
    this.showform = true;
  }

  goback(){
    this.showform = false;
  }
  OnSubmit(Caption,Image){
    var myform: FormData = new FormData();
    myform.append("photo",this.filetoupload,this.filetoupload["name"]);
    myform.append("name",Caption.value);
    myform.append("id",this.me["id"]);
    
    this.myapi.myPost2(myform,"updateprofile").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.msgalert = "<div class='alert alert-success'>"+data['response']+"</div>";
        this.getProfile();
      }
    });
  }

  handleFileInput(file:FileList){
    this.filetoupload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageurl = event.target.result;
    }
    reader.readAsDataURL(this.filetoupload);
  }

  getAllArticles(){
    this.myapi.myGet("getallarticles").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allarticles = data["response"];
      }
    });
  }
}
