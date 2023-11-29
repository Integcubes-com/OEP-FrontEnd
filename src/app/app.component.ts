import { Component } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { PlatformLocation } from "@angular/common";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  currentUrl: string;
  constructor(public _router: Router, location: PlatformLocation) {
    const menuOption = "menu_dark";
    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("menuOption", menuOption);
    localStorage.setItem("choose_skin", "theme-" + 'green');
    localStorage.setItem("choose_skin_active", 'black');
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        // location.onPopState(() => {
        //   window.location.reload();
        // });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf("/") + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
      }
      window.scrollTo(0, 0);
    });
  }
}
