import { filterNecessaryImagesForImport } from "./function/filterNecessaryImagesForImport";

function importAll(r) {
 let images = {};
 r.keys().map((item, index) => {
  images[item.replace('./', '')] = r(item);
 });
 return images;
}

const IconPatternImagesObj = importAll(require.context('@pattern/icon', true, /\.(png|jpe?g|svg|webp)$/));

export const IconPatternImages = filterNecessaryImagesForImport(IconPatternImagesObj, "new");