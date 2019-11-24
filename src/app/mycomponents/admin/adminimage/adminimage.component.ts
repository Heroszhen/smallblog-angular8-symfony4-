import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../../services/myapi.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminimage',
  templateUrl: './adminimage.component.html',
  styleUrls: ['./adminimage.component.css']
})
export class AdminimageComponent implements OnInit {
  page = "adminimage";
  mobileversion = false;
  showadminnav = false;
  uploaddir;

  allimages:any;
  imageurl:string = '';
  filetoupload: File = null;
  msgalert = "";
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

  //beginning
  getAllArticles(){
    this.myapi.myGet("getallimages").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allimages = data["data"];
        //console.log(this.allimages);
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

  addOnePhoto(){
    if(this.filetoupload != null){
      var myform: FormData = new FormData();
      myform.append("Image",this.filetoupload);
      myform.append("Caption","addoneimage");
      this.myapi.myPost2(myform,"addoneimage").subscribe((data)=>{
        if(data != null && Object.keys(data).length !== 0){
          this.allimages.unshift(data["data"]);
          this.imageurl = "";
          this.filetoupload = null
        }
      });
    }
  }

  deleteOneImage(key){
    var query = {"id":this.allimages[key].id};
    this.myapi.login(query,"deleteoneimage").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        if(data["response"] == "done")this.allimages.splice(key,1);
      }
    });
  }
}
