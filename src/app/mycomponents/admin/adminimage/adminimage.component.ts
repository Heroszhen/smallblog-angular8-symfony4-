import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminimage',
  templateUrl: './adminimage.component.html',
  styleUrls: ['./adminimage.component.css']
})
export class AdminimageComponent implements OnInit {
  page = "adminimage";
  mobileversion = false;
  showadminnav = false;

  constructor() { 
    this.checkinnerWidth();
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
}
