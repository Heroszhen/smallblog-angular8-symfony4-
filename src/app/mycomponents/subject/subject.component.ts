import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router} from "@angular/router";
import { MyapiService } from '../../services/myapi.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjectid = -1;
  thesubject:any = "";
  alltexts:any = "";
  constructor(private route: ActivatedRoute,private myapi:MyapiService,private router:Router) { 
    this.route.params.subscribe( (params) =>{
      this.subjectid = params.id;
      if(this.subjectid != -1){
        this.getTheSubject(this.subjectid);
        this.getAllTexts(this.subjectid);
      }
    });
   }

  ngOnInit() {
  }

  getTheSubject(subjectid){
    this.myapi.login({"subjectid":this.subjectid},"getonesubject").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.thesubject = data["data"];
      }
    });
  }

  getAllTexts(subjectid){
    this.myapi.login({"subjectid":this.subjectid},"getsubjecttexts").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.alltexts = data["data"];
      }
    });
  }
}
