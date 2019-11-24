import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Router} from "@angular/router";
import { MyapiService } from '../../services/myapi.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  allarticles;
  showarticles:boolean = false;
  usefullinks:any = "";
  constructor(private myapi:MyapiService,private router:Router) { 
    //this.myapi.checkConnection();
    this.myapi.page$.next(["blog"]);
    this.getAllArticles();
    this.getUsefullinks();
  }

  ngOnInit() {
  }

  getAllArticles(){
    this.myapi.myGet("getallarticles").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allarticles = data["response"];
        this.showarticles = true;
      }
    });
  }

  getUsefullinks(){
    this.myapi.myGet("getuserfullinks").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.usefullinks = data["response"];
      }
    });
  }

}
