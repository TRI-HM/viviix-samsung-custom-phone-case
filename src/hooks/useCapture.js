import html2canvas from "html2canvas";
import { appendObjJson } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export const useCapture = () => {
  const navigate = useNavigate();

  const handleDraggableItem = (item, delta) => {
    item.style.width = `${item.clientWidth * delta}px`;
    item.style.height = `${item.clientHeight * delta}px`;

    const currentTop = parseInt(item.style.top);
    const currentLeft = parseInt(item.style.left);
    item.style.setProperty("top", `${currentTop * delta}px`);
    item.style.setProperty("left", `${currentLeft * delta}px`);

    let transform = item.style.transform;
    if (!transform) {
      return;
    }

    transform = transform.replace("matrix3d(", "");
    transform = transform.replace(")", "");
    const transformValues = transform.split(", ");
    transformValues[12] = parseInt(transformValues[12]) * delta;
    transformValues[13] = parseInt(transformValues[13]) * delta;

    item.style.transform = `matrix3d(${transformValues.join()})`;
  };

  const onCapture = () => {
    const mesh = document.getElementById("mesh");

    let meshClone = mesh.cloneNode(true);
    meshClone.style.setProperty("top", "0px", "important");
    meshClone.style.setProperty("left", "0px", "important");
    meshClone.id = "meshClone";
    meshClone.style.zIndex = "-9999";
    // meshClone.style.transform = "scale(2) rotate(90deg) translate(0px, -100%)";
    // meshClone.style.transformOrigin = "top left";

    document.getElementsByTagName("body")[0].appendChild(meshClone);
    meshClone = document.getElementById("meshClone");
    //TODO: RESIZE IMG
    const oldWidth = mesh.clientWidth; //180
    const oldHeight = mesh.clientHeight; //425

    // const newWidth = (oldWidth * 640) / 351;
    const wantedWidth = 1280; //we will resize the image to this wantedWidth after capturing
    const wantedHeight = wantedWidth * (425 / 180);
    const newWidth = 1280;
    const delta = newWidth / oldWidth;
    const newHeight = oldHeight * delta;

    meshClone.style.setProperty("width", `${newWidth}px`, "important");
    meshClone.style.setProperty("height", `${newHeight}px`, "important");

    //resize background
    meshClone.style.backgroundSize = `${110 * delta}px ${110 * delta}px`;

    document.querySelectorAll("body #meshClone .draggable").forEach((item) => {
      handleDraggableItem(item, delta);
    });
    document
      .querySelectorAll("body #meshClone .sjx-wrapper")
      .forEach((item) => item.remove());

    html2canvas(meshClone, {
      width: newWidth,
      height: newHeight,
      windowWidth: newWidth,
      windowHeight: newHeight,
    }).then((canvas) => {
      const base64 = canvas.toDataURL("image/jpeg");
      const resizeImg = document.createElement("img");
      resizeImg.onload = function () {
        const resizeCanvas = document.createElement("canvas");
        const ctx = resizeCanvas.getContext("2d");
        resizeCanvas.width = wantedWidth;
        resizeCanvas.height = wantedHeight;
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
        const resizedBase64 = resizeCanvas.toDataURL("image/jpeg");
        appendObjJson({ texture: resizedBase64 });
        meshClone.remove();
        navigate("/result");
      };
      resizeImg.src = base64;
    });
  };
  //#region toPng
  // toPng(meshClone, {
  //   width: newWidth,
  //   height: newHeight,
  //   quality: 1,
  //   // canvasWidth: newWidth,
  //   // canvasHeight: newHeight,
  // })
  //   .then((base64) => {
  //     console.log(base64);
  //     appendObjJson({ texture: base64 });
  //     document.getElementById("test").src = base64;
  //     meshClone.remove();
  //     navigate("/result");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //#endregion
  return { onCapture };
};
