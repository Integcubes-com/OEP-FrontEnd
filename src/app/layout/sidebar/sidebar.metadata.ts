// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  role: string[];
  submenu: RouteInfo[];
}
export interface SideNavMenu {
  menuId:number,
  parentId:number,
  badge:string,
  badgeClass:string,
  class:string,
  groupTitle:boolean,
  icon:string,
  iconType:string,
  path:string,
  role:any[],
  subMenu:any[],
  title:string,
}
export interface ApiMenu{
  menuId:number,
  parentId:number,
  badge:string,
  badgeClass:string,
  class:string,
  groupTitle:boolean,
  icon:string,
  iconType:string,
  path:string,
  role:string,
  title:string,
  isDeleted:number
}
