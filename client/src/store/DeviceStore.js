import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._basketDevices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 9;
    this._amount = 0;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }
  setPage(page) {
    this._page = page;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  setBasketDevices(basketDevices) {
    this._basketDevices = basketDevices;
  }
  setAmount(amount) {
    this._amount = amount;
  }

  get getTypes() {
    return this._types;
  }
  get getBrands() {
    return this._brands;
  }
  get getDevices() {
    return this._devices;
  }
  get getSelectedType() {
    return this._selectedType;
  }
  get getSelectedBrand() {
    return this._selectedBrand;
  }
  get getTotalCount() {
    return this._totalCount;
  }
  get getPage() {
    return this._page;
  }
  get getLimit() {
    return this._limit;
  }
  get getBasketDevices() {
    return this._basketDevices;
  }
  get getAmount() {
    return this._amount;
  }
}
