export const filterNecessaryImagesForImport = (ImagesObj, keyWord) => {
 let seenValues = {};
 let resultObj = {};

 for (let key in ImagesObj) {
  if (seenValues[ImagesObj[key]]) {
   if (key.length < seenValues[ImagesObj[key]].length) {

    delete resultObj[seenValues[ImagesObj[key]]];
    resultObj[key] = ImagesObj[key];
    seenValues[ImagesObj[key]] = key;

   }

  } else {
   resultObj[key] = ImagesObj[key];
   seenValues[ImagesObj[key]] = key;
  }
 }

 for (let key in resultObj) {
  if (key.match(`${keyWord}`)) {
   resultObj[key] = { url: resultObj[key], type: "rectangular" };
  }
  else {
   resultObj[key] = { url: resultObj[key], type: "square" };
  }

 }
 return resultObj;
}