import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent,SafePipe } from './app.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MyapiService } from './services/myapi.service';


import { BlogComponent } from './mycomponents/blog/blog.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { ProfileComponent } from './mycomponents/profile/profile.component';
import { OnearticleComponent } from './mycomponents/onearticle/onearticle.component';
import { AdminnavComponent } from './mycomponents/admin/adminnav/adminnav.component';
import { AdminarticleComponent } from './mycomponents/admin/adminarticle/adminarticle.component';
import { AdminimageComponent } from './mycomponents/admin/adminimage/adminimage.component';
import { VideoComponent } from './mycomponents/video/video.component';
import { ImageComponent } from './mycomponents/image/image.component';
import { AdmincommentComponent } from './mycomponents/admin/admincomment/admincomment.component';
import { AdminvideoComponent } from './mycomponents/admin/adminvideo/adminvideo.component';
import { SubjectComponent } from './mycomponents/subject/subject.component';
import { AdminsubjectComponent } from './mycomponents/admin/adminsubject/adminsubject.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    LoginComponent,
    ProfileComponent,
    OnearticleComponent,
    AdminnavComponent,
    AdminarticleComponent,
    AdminimageComponent,
    VideoComponent,
    SafePipe,
    ImageComponent,
    AdmincommentComponent,
    AdminvideoComponent,
    SubjectComponent,
    AdminsubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [MyapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
