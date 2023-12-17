function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export const ShowStickerImagesObj = importAll(require.context('@sticker/show', false, /\.(png|jpe?g|svg|webp)$/))

let seenValues = {};
let resultObj = {};

for (let key in ShowStickerImagesObj) {
 if (seenValues[ShowStickerImagesObj[key]]) {
  if (key.length < seenValues[ShowStickerImagesObj[key]].length) {

   delete resultObj[seenValues[ShowStickerImagesObj[key]]];
   resultObj[key] = ShowStickerImagesObj[key];
   seenValues[ShowStickerImagesObj[key]] = key;
   
  }

 } else {
  resultObj[key] = ShowStickerImagesObj[key];
  seenValues[ShowStickerImagesObj[key]] = key;
 }
}

export const ShowStickerImages = resultObj;