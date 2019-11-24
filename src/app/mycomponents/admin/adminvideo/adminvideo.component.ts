import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../../services/myapi.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminvideo',
  templateUrl: './adminvideo.component.html',
  styleUrls: ['./adminvideo.component.css']
})
export class AdminvideoComponent implements OnInit {
  page = "adminvideo";
  mobileversion = false;
  showadminnav = false;
  uploaddir;

  allvideos:any;
  video1 = {
    "title":"",
    "link":"",
    "plot":"",
  };
  msgalert1:string = '';
  constructor(private myapi:MyapiService,private router:Router) { 
    var isconnected = this.myapi.isconnected$.getValue();
    if(isconnected.length == 0 || isconnected[0] != true)this.router.navigate(["/"]);
    this.uploaddir = this.myapi.uploaddir$.getValue()[0];
    
    this.getAllVideos();
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
  getAllVideos(){
    this.myapi.myGet("getallvideos").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allvideos = data["response"];
      }
    });
  }

  addOneVideo(){
    this.msgalert1 = "";
    this.myapi.login(this.video1,"addonevideo").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allvideos = data["data"];
        this.msgalert1 = "<div class='alert alert-success'>Votre video a été enregistrée avec succès</div>";
        this.video1.title = "";
        this.video1.link = "";
        this.video1.plot = "";
      }
    });
  }

  editonevideo(event,key){
    //console.log(event.target.parentNode.parentNode);//btn.td.tr
    //value of textarea
    var title = event.target.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].value;
    var link = event.target.parentNode.parentNode.childNodes[2].childNodes[0].childNodes[0].value;
    var plot = event.target.parentNode.parentNode.childNodes[3].childNodes[0].childNodes[0].value;
    var query = {
      "id":this.allvideos[key].id,
      "title":title,
      "link":link,
      "plot": plot,
    };
    this.myapi.login(query,"editonevideo").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        if(data["response"] == "done")alert("Vos modifications ont été enregistrées avec succès");
      }
    });
  }

  deleteonevideo(key){
    var query = {"id":this.allvideos[key].id};
    this.myapi.login(query,"deleteonevideo").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        if(data["response"] == "done")this.allvideos.splice(key,1);
      }
    });
  }
}
