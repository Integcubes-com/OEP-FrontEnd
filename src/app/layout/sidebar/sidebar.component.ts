import { Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from "@angular/core";
// import { ROUTES } from "./sidebar-items";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { BehaviorSubject, combineLatest, map, Subscription } from "rxjs";
import { ApiMenu, SideNavMenu } from "./sidebar.metadata";
import { UserProfileService } from "src/app/admin/profile/user-profile/user-profile.service";
import { User } from "src/app/core/models/user";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private imageSubject = new BehaviorSubject<string>('');
  imageSubject$ = this.imageSubject.asObservable();
  image$ = combineLatest([
    this.dataService.imageSubject$,
    this.imageSubject$
  ])
  .pipe(
    map(([updatedImage, image])=>{
    if(updatedImage!=''){
      let test = `data:image/png;base64,${updatedImage}`;
      return test
    }
    else{
      let test = `data:image/png;base64,${image}`;
        return test
    }
  }))
  public sidebarItems: any[];
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  routerObj = null;
  subs:Subscription;
  apiMenu: ApiMenu[] =[];
  menu:SideNavMenu={
    menuId: 0,
    parentId: 0,
    badge: "",
    badgeClass: "",
    class: "",
    groupTitle: false,
    icon: "",
    iconType: "",
    path: "",
    role: [],
    subMenu: [],
    title: ""
  }
  thirdLevelmenu:SideNavMenu={
    menuId: 0,
    parentId: 0,
    badge: "",
    badgeClass: "",
    class: "",
    groupTitle: false,
    icon: "",
    iconType: "",
    path: "",
    role: [],
    subMenu: [],
    title: ""
  }
  menuReset:SideNavMenu={
    menuId: 0,
    parentId: 0,
    badge: "",
    badgeClass: "",
    class: "",
    groupTitle: false,
    icon: "",
    iconType: "",
    path: "",
    role: [],
    subMenu: [],
    title: ""
  }
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  menuList:SideNavMenu[]=[];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private dataService:UserProfileService,
  ) {
    const body = this.elementRef.nativeElement.closest("body");
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, "overlay-open");
      }
    });
  }
  @HostListener("window:resize", ["$event"])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }

  callToggleMenu(event: any, length: any) {
    if (length > 0) {
      const parentElement = event.target.closest("li");
      const activeClass = parentElement.classList.contains("active");

      if (activeClass) {
        this.renderer.removeClass(parentElement, "active");
      } else {
        this.renderer.addClass(parentElement, "active");
      }
    }
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.subs = this.authService.getMenu(this.user.id).subscribe({
        next: data =>{this.apiMenu = [...data];
          for (var i = 0; i < this.apiMenu.length; i++) {
            if (this.apiMenu[i].parentId == 0) {
              this.menu.badge = this.apiMenu[i].badge;
              this.menu.badgeClass = this.apiMenu[i].badgeClass;
              this.menu.class = this.apiMenu[i].class;
              this.menu.groupTitle = this.apiMenu[i].groupTitle;
              this.menu.icon = this.apiMenu[i].icon;
              this.menu.iconType = this.apiMenu[i].iconType;
              this.menu.menuId = this.apiMenu[i].menuId;
              this.menu.parentId = this.apiMenu[i].menuId;
              this.menu.path = this.apiMenu[i].path;
              this.menu.title = this.apiMenu[i].title;
              this.menu.role=[this.apiMenu[i].role];
              for (var j = 0; j < this.apiMenu.length; j++) {
                if (this.apiMenu[j].parentId == this.menu.menuId) {
                  this.menuReset.badge = this.apiMenu[j].badge;
                  this.menuReset.badgeClass = this.apiMenu[j].badgeClass;
                  this.menuReset.class = this.apiMenu[j].class;
                  this.menuReset.groupTitle = this.apiMenu[j].groupTitle;
                  this.menuReset.icon = this.apiMenu[j].icon;
                  this.menuReset.iconType = this.apiMenu[j].iconType;
                  this.menuReset.menuId = this.apiMenu[j].menuId;
                  this.menuReset.parentId = this.apiMenu[j].menuId;
                  this.menuReset.path = this.apiMenu[j].path;
                  this.menuReset.title = this.apiMenu[j].title;
                  this.menuReset.role=[this.apiMenu[j].role];
                  for (var k = 0; k < this.apiMenu.length; k++) {
                    if (this.apiMenu[k].parentId == this.menuReset.menuId) {
                      this.thirdLevelmenu.badge = this.apiMenu[k].badge;
                      this.thirdLevelmenu.badgeClass = this.apiMenu[k].badgeClass;
                      this.thirdLevelmenu.class = this.apiMenu[k].class;
                      this.thirdLevelmenu.groupTitle = this.apiMenu[k].groupTitle;
                      this.thirdLevelmenu.icon = this.apiMenu[k].icon;
                      this.thirdLevelmenu.iconType = this.apiMenu[k].iconType;
                      this.thirdLevelmenu.menuId = this.apiMenu[k].menuId;
                      this.thirdLevelmenu.parentId = this.apiMenu[k].menuId;
                      this.thirdLevelmenu.path = this.apiMenu[k].path;
                      this.thirdLevelmenu.title = this.apiMenu[k].title;
                      this.thirdLevelmenu.role=[this.apiMenu[k].role];
                      this.menuReset.subMenu.push({ ...this.thirdLevelmenu });
                    }
                  }
                  this.menu.subMenu.push({ ...this.menuReset });
                  this.menuReset.subMenu=[];
                }
              }
  
              this.menuList.push({...this.menu})
              this.menu.role=[];
              this.menu.subMenu=[];
              this.menuReset.role=[];
              this.menuReset.subMenu=[];
              this.thirdLevelmenu.subMenu=[];
            }
          }
          const userRole = this.authService.currentUserValue.role;
          this.userFullName =
            this.authService.currentUserValue.username
          this.userImg = this.authService.currentUserValue.img;
          if (this.userImg) {
            this.imageSubject.next(this.userImg);
          }
          this.sidebarItems = this.menuList.filter(
            (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf("All") !== -1
          );
          if (userRole === Role.Level3) {
            this.userType = Role.Level3;
          } else if (userRole === Role.Level1) {
            this.userType = Role.Level1;
          } else if (userRole === Role.Level2) {
            this.userType = Role.Level2;
          } else {
            this.userType = Role.Level3;
          }
        },
        error: err => {}
      });}
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
    this.subs.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + "";
    this.listMaxWidth = "500px";
  }
  isOpen() {
    return this.bodyTag.classList.contains("overlay-open");
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, "ls-closed");
    } else {
      this.renderer.removeClass(this.document.body, "ls-closed");
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("submenu-closed")) {
      this.renderer.addClass(this.document.body, "side-closed-hover");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("side-closed-hover")) {
      this.renderer.removeClass(this.document.body, "side-closed-hover");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(["/authentication/signin"]);
      }
    });
  }
}
