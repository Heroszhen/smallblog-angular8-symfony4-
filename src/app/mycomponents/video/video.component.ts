import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../../services/myapi.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  onevideo = "<iframe width='560' height='315' src='https://www.youtube.com/embed/UTusmVpwJXo' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
  constructor(private myapi:MyapiService) { }

  ngOnInit() {
  }

}
