import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngxsmart-alert-demo",
  templateUrl: "./alert-demo.component.html",
  styleUrls: ["./alert-demo.component.scss"]
})
export class AlertDemoComponent implements OnInit {
  dismissOnTimeout = true;
  dismissible = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
