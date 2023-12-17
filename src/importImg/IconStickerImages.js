function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const IconStickerImagesObj = importAll(require.context('@sticker/icon/', false, /\.(png|jpe?g|svg|webp)$/))


let seenValues = {};
let resultObj = {};

for (let key in IconStickerImagesObj) {
 if (seenValues[IconStickerImagesObj[key]]) {
  if (key.length < seenValues[IconStickerImagesObj[key]].length) {

   delete resultObj[seenValues[IconStickerImagesObj[key]]];
   resultObj[key] = IconStickerImagesObj[key];
   seenValues[IconStickerImagesObj[key]] = key;
   
  }

 } else {
  resultObj[key] = IconStickerImagesObj[key];
  seenValues[IconStickerImagesObj[key]] = key;
 }
}

export const IconStickerImages = resultObj;