import { filterNecessaryImagesForImport } from "./function/filterNecessaryImagesForImport";

function importAll(r) {
 // console.log(r);
 let images = {};
 r.keys().map((item, index) => {
  images[item.replace('./', '')] = r(item);
 });
 return images;
}
const ShowPatternImagesObj = importAll(require.context('@pattern/show', true, /\.(png|jpe?g|svg|webp)$/));

export const ShowPatternImages = filterNecessaryImagesForImport(ShowPatternImagesObj, "new");