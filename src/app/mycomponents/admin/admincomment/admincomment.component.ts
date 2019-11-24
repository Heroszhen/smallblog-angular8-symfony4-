import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../../services/myapi.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admincomment',
  templateUrl: './admincomment.component.html',
  styleUrls: ['./admincomment.component.css']
})
export class AdmincommentComponent implements OnInit {
  page = "admincomment";
  mobileversion = false;
  showadminnav = false;
  uploaddir;

  allarticles;
  constructor(private myapi:MyapiService,private router:Router) { 
    var isconnected = this.myapi.isconnected$.getValue();
    if(isconnected.length == 0 || isconnected[0] != true)this.router.navigate(["/"]);
    this.uploaddir = this.myapi.uploaddir$.getValue()[0];
    
    this.getAllComments();
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
  getAllComments(){
    this.myapi.myGet("getallcommentsofarticles").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allarticles = data["response"];
      }
    });
  }

  deleteOneComment(key,key2){
    var commentid = this.allarticles[key]["comments"][key2]["id"];
    var query = {
      "id":commentid
    }
    this.myapi.login(query,"deleteonecomment").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allarticles[key]["comments"].splice(key2,1);
      }
    });
  }
}
