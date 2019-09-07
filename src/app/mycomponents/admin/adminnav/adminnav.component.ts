import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  @Input() fatherpage:string = "adminarticle";
  constructor() { }

  ngOnInit() {
  }

}
