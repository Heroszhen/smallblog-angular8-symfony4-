import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './mycomponents/blog/blog.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { ProfileComponent } from './mycomponents/profile/profile.component';
import { OnearticleComponent } from './mycomponents/onearticle/onearticle.component';
import { AdminarticleComponent } from './mycomponents/admin/adminarticle/adminarticle.component';
import { AdminimageComponent } from './mycomponents/admin/adminimage/adminimage.component';
import { VideoComponent } from './mycomponents/video/video.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'onearticle/:id', component: OnearticleComponent },
  { path: 'admin/article', component: AdminarticleComponent },
  { path: 'admin/image', component: AdminimageComponent },
  { path: 'video', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
