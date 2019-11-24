import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './mycomponents/blog/blog.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { ProfileComponent } from './mycomponents/profile/profile.component';
import { OnearticleComponent } from './mycomponents/onearticle/onearticle.component';
import { AdminarticleComponent } from './mycomponents/admin/adminarticle/adminarticle.component';
import { AdminimageComponent } from './mycomponents/admin/adminimage/adminimage.component';
import { VideoComponent } from './mycomponents/video/video.component';
import { ImageComponent } from './mycomponents/image/image.component';
import { AdmincommentComponent } from './mycomponents/admin/admincomment/admincomment.component';
import { AdminvideoComponent } from './mycomponents/admin/adminvideo/adminvideo.component';
import { SubjectComponent } from './mycomponents/subject/subject.component';
import { AdminsubjectComponent } from './mycomponents/admin/adminsubject/adminsubject.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'onearticle/:id', component: OnearticleComponent },
  { path: 'admin/article', component: AdminarticleComponent },
  { path: 'admin/image', component: AdminimageComponent },
  { path: 'video', component: VideoComponent },
  { path: 'image', component: ImageComponent },
  { path: 'admin/comment', component: AdmincommentComponent },
  { path: 'admin/video', component: AdminvideoComponent },
  { path: 'subject/:id', component: SubjectComponent },
  { path: 'admin/sujet', component: AdminsubjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
