import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post(
    "https://localhost:5000/api/type",
    type
  );
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("https://localhost:5000/api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post(
    "https://localhost:5000/api/brand",
    brand
  );
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("https://localhost:5000/api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post(
    "https://localhost:5000/api/device",
    device
  );
  return data;
};

export const fetchDevices = async (typeId, brandId, page) => {
  const { data } = await $host.get("https://localhost:5000/api/device", {
    params: {
      typeId,
      brandId,
      page,
    },
  });
  console.log(data);
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("https://localhost:5000/api/device/" + id);
  return data;
};

export const createBasket = async (basket) => {
  const { data } = await $host.post(
    "https://localhost:5000/api/basket/",
    basket
  );
  return data;
};

export const fetchDevicesInBasket = async (userId) => {
  const { data } = await $host.get(
    "https://localhost:5000/api/basket/" + userId
  );
  console.log(data);
  return data;
};

export const deleteItemFromBasket = async (basketId) => {
  const { data } = await $host.delete(
    "https://localhost:5000/api/basket/" + basketId
  );
  return data;
};

export const deleteDevice = async (deviceId) => {
  console.log(deviceId);
  const { data } = await $host.delete(
    "https://localhost:5000/api/device/" + deviceId
  );
  return data;
};
export const updateDeviceAPI = async (device) => {
  console.log(device);
  const { data } = await $host.post(
    "https://localhost:5000/api/device/update",
    device
  );
  return data;
};
export const deleteBrand = async (brandId) => {
  console.log(brandId);
  const { data } = await $host.delete(
    "https://localhost:5000/api/brand/" + brandId
  );
  return data;
};
export const deleteType = async (typeId) => {
  const { data } = await $host.delete(
    "https://localhost:5000/api/type/" + typeId
  );
  return data;
};
export const searchDevice = async (name) => {
  const { data } = await $host.get(
    "https://localhost:5000/api/device/name/" + name
  );
  console.log(data);
  return data;
};
export const payStripe = async (info) => {
  console.log("--------------");
  const { data } = await $host.post("https://localhost:5000/api/stripe/", info);
  console.log("--------------");
  return data;
};
