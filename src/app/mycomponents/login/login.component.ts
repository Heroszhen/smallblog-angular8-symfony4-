import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router} from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { MyapiService } from '../../services/myapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  section:string;
  loginForm: FormGroup;
  logupForm: FormGroup;
  connectionmsg:string = "";
  registrationmsg:string = "";
  constructor(private route: ActivatedRoute,private myapi:MyapiService,private router:Router) { 
    this.route.params.subscribe( (params) =>{
      if(params.id == 1){
        this.section = "login";
        this.myapi.isconnected$.subscribe((data)=>{
          if(data[0] == true)this.router.navigate(["/blog"]);
        });
      }
      if(params.id == 2){
        this.section = "logup";
      }
    });
    this.createloginForm();
    this.createlogupForm();
  }

  ngOnInit() {
  
    $(document).ready(() => { 
      $("#login input").focus(function(e){
        $(this).css("outline","none");
        $(this).parent().find("path").attr("stroke","white");
      });
  
      $("#login input").focusout(function(e){
          $(this).parent().find("path").attr("stroke","gray");
      });
    });
  }

  private createloginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(5)]),
    });
  }

  private createlogupForm() {
    this.logupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(5)]),
    });
  }

  private login(){
    this.myapi.login(this.loginForm.value,"connection").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        if(data["response"] == "done"){
          this.myapi.setCookie("user",data["user"]);
          //this.myapi.isconnected$.next([true]);
          this.myapi.checkConnection();
          this.router.navigate(['/']);
        }else{
          this.connectionmsg = data["response"];
        }
      }
    });
  }

  private logup(){
    this.myapi.login(this.logupForm.value,"registration").subscribe((data)=>{
      if(data != null && Object.keys(data).length !== 0){
        if(data["response"] == "done"){
          this.registrationmsg = "<div class='text-success'>Votre compte a été créé avec succès</div>";
        }else{
          this.registrationmsg = "<div class='text-danger'>"+data["response"]+"</div>";
        }
      }
    });
  }
}
