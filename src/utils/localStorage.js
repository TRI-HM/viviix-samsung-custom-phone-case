import { texture } from "../const/texture";

export const saveObjJson = (data) => {
  localStorage.setItem("objJson", JSON.stringify(data));
};

export const appendObjJson = (data) => {
  const currentData = getObjJson();
  saveObjJson({ ...currentData, ...data });
};

export const getObjJson = () => {
  let data = localStorage.getItem("objJson");
  if (!data) {
    return {
      name: "json",
      logo: "1",
      background: "old/icon (20).webp",
      texture: texture,
      draggables: [],
      isStart: false,
      isThanks: false
    };
  }
  return JSON.parse(data);
};
