import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {
  urlapi = "http://127.0.0.1:8000/api/";
  isconnected$ = new BehaviorSubject([]);
  uploaddir$ = new BehaviorSubject(["http://localhost:8888/blogapi/public/images/"]);
  showadmin$ = new BehaviorSubject([]);
  constructor(private http:HttpClient) { }
  
  checkConnection(){
    var v = this.getCookie("user");
    if(v == "no")this.isconnected$.next([false]);
    else{
      this.isconnected$.next([true]);
      v = JSON.parse(v);
      if(v["id"] == 1)this.showadmin$.next([true]);
      else this.showadmin$.next([false]);
    } 
  }
  private handleError(error: HttpErrorResponse) {
	  console.log(error);
	  // return an observable with a user friendly message
	  return throwError('Error! something went wrong.');
  }
  login(query,url){
    return this.http.post(this.urlapi+""+url, JSON.stringify(query));
  }

  myPost2(query,url){
    return this.http.post(this.urlapi+""+url, query);
  }

  myGet(url){
    return this.http.get(this.urlapi+""+url);
  }

  //cookies
  setCookie(name,valuejson){
    document.cookie = name+"="+JSON.stringify(valuejson);  
    //JSON.stringify(valuejson)
    }
    
    getCookie(name){
    var myarray = document.cookie.split("; ");
    for(var i =0; i<myarray.length;i++){
      var courantarray = myarray[i].split('=');
      if(courantarray[0] == name){
        return courantarray[1];
      }
    }
    return "no";
    }
    
    deleteCookie(name){
      document.cookie = name+'=;max-age=-99';
    }
}
