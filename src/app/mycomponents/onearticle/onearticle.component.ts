import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../services/myapi.service';
import {ActivatedRoute , Router} from "@angular/router";

@Component({
  selector: 'app-onearticle',
  templateUrl: './onearticle.component.html',
  styleUrls: ['./onearticle.component.css']
})
export class OnearticleComponent implements OnInit {
  articleid = -1;
  article;
  showarticle:boolean = false;
  uploaddir;
  isconnected = false;
  me;
  mycomment:string = "";
  allcomments:any;
  constructor(private route: ActivatedRoute,private myapi:MyapiService,private router:Router) { 
    this.route.params.subscribe( (params) =>{
      this.articleid = params.id;
      if(this.articleid != -1){
        this.getOneArticle(this.articleid);
        this.getAllComments(this.articleid);
      }
    });
    this.uploaddir = this.myapi.uploaddir$.getValue()[0];
    this.me = this.myapi.getCookie("user");
    if(this.me == "no")this.isconnected = false;
    else{
      this.me = JSON.parse(this.me);
      this.isconnected = true;
    } 
  }

  ngOnInit() {
  }

  getOneArticle(id){
    var query = {
      "articleid":id
    };
    this.myapi.login(query,"getonearticle").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.article = data["response"];
        this.showarticle = true;
      }
    });
  }

  getAllComments(articleid){
    var query = {
      "articleid":articleid
    };
    this.myapi.login(query,"getallcomments").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allcomments = data["data"];
      }
    });
  }
  onsubmit(){
    var query = {
      "content":this.mycomment,
      "userid":this.me.id,
      "articleid":this.articleid
    };
    this.myapi.login(query,"addonecomment").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        this.allcomments = data["data"];
        this.mycomment = "";
      }
    });
  }
}
