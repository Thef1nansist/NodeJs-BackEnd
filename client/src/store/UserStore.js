import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._role = "";
    this._id = 0;
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setRole(role) {
    this._role = role;
  }
  setUserId(id) {
    console.log("setID ------------------");
    console.log(id);
    this._id = id;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    console.log("-------------user");
    return this._user;
  }
  get role() {
    console.log("-------------role");
    return this._role;
  }
  get userId() {
    console.log("-------------id");
    console.log(this._id);
    return this._id;
  }
}
