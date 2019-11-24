import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../services/myapi.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  allimages:any;
  uploaddir:string;
  bigimageurl:string = '';
  constructor(private myapi:MyapiService) { 
    this.myapi.page$.next(["images"]);
    this.getAllImages();
    this.uploaddir = this.myapi.uploaddir$.getValue()[0];
  }

  ngOnInit() {
  }

  getAllImages(){
    this.myapi.myGet("getallimages").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allimages = data["data"];
      }
    });
  }

  showbigimg(key){
    this.bigimageurl = this.uploaddir+'imageimages/'+this.allimages[key].name;
  }

  hidebigimg(){
    this.bigimageurl = '';
  }
}
