import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../services/myapi.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  onevideo :any;
  allvideos:any;
  showvideos:boolean = false;
  section1:boolean = true;
  section2:boolean = false;
  constructor(private myapi:MyapiService) {
    this.myapi.page$.next(["videos"]);
    this.getAllVideos();
  }

  ngOnInit() {
  }

  getAllVideos(){
    this.myapi.myGet("getallvideos").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allvideos = data["response"];
        this.showvideos = true;
      }
    });
  }

  showonevideo(key){
    this.onevideo = this.allvideos[key];
    this.section1 = false;
    this.section2 = true;
  }
  
  goback(){
    this.section1 = true;
    this.section2 = false;
  }
}
