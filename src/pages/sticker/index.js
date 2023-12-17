import React, { useEffect } from "react";
import subjx from "subjx";
import "subjx/dist/style/subjx.css";
import { toPng } from "html-to-image";
import "./styles.css";
import { IconStickerImages } from "../../importImg/IconStickerImages";
// import { LogoImages } from "../../importImg/LogoImages";
import { ShowStickerImages } from "../../importImg/ShowStickerImages";
import {
  appendObjJson,
  getObjJson,
  saveObjJson,
} from "../../utils/localStorage";
import { ShowPatternImages } from "../../importImg/ShowPatternImages";
// import html2canvas from "html2canvas";

import maskSamsum from "../../asset/img/model/ss_mask.webp";
import { useNavigate } from "react-router-dom";

const subjxOptions = {
  container: "#mesh",
  cursorMove: "move",
  cursorRotate: "crosshair",
  cursorResize: "pointer",
  proportions: true,
};

const StickerPage = () => {
  const navigator = useNavigate()
  //#region
  //   const meshRef = useRef(null);
  useEffect(() => {
    const draggables = [subjx(".draggable").drag(subjxOptions)];
    let selectedId = -1;

    const addDraggableIcon = (draggableInfo) => {
      const stack = subjx("#mesh")[0],
        img = document.createElement("img");
      // offset = stack.getBoundingClientRect(),
      img.style.top = `270px`;
      img.style.left = `40px`;
      if (draggableInfo.transform) {
        img.style.transform = draggableInfo.transform;
      }
      if (draggableInfo.width) {
        img.style.width = draggableInfo.width;
      }
      if (draggableInfo.height) {
        img.style.height = draggableInfo.height;
      }

      img.classList.add("draggable", "target-img");
      img.src = draggableInfo.icon;
      const id = draggableInfo.id;
      img.setAttribute("data-id", id);
      img.addEventListener("click", (e) => {
        onDraggableItemClick(e.target.getAttribute("data-id"));
      });

      stack.appendChild(img);
      const newDraggableItem = subjx(img).drag(subjxOptions);
      newDraggableItem.id = id;
      draggables.push(newDraggableItem);

      // draggables.push(subjx(img));
      // onDraggableItemClick(id);
    };

    const initDraggables = () => {
      const storedData = getObjJson();
      if (!storedData?.draggables) {
        return;
      }
      storedData.draggables.forEach((item) => {
        addDraggableIcon(item);
      });
      if (draggables.length > 1)
        onDraggableItemClick(storedData.draggables[0].id);
    };

    const saveDraggableInfo = (id, info) => {
      const storedData = getObjJson();
      if (!storedData?.draggables) {
        storedData.draggables = [];
      }
      const i = storedData.draggables.findIndex((item) => item?.id === id);
      if (i < 0) {
        storedData.draggables.push({
          id,
          ...info,
        });
      } else {
        storedData.draggables[i] = {
          ...storedData.draggables[i],
          ...info,
        };
      }
      saveObjJson(storedData);
    };

    const onDraggableItemClick = (id) => {
      selectedId = id;
      draggables.forEach((item, index) => {
        if (!item) return;
        item.disable();
        if (item.id === id) {
          item.enable({
            ...subjxOptions,
            onMove(moveInfo) {
              // moveInfo = { clientX, clientY, dx, dy, transform }
              const img = document.querySelector(`[data-id="${id}"]`);
              saveDraggableInfo(id, { transform: img.style.transform });
            },
            onResize(resizeInfo) {
              const img = document.querySelector(`[data-id="${id}"]`);
              // resizeInfo = { clientX, clientY, dx, dy, transform, width, height }
              saveDraggableInfo(id, {
                width: img.style.width,
                height: img.style.height,
              });
            },
            onRotate(rotateInfo) {
              const img = document.querySelector(`[data-id="${id}"]`);
              // rotateInfo = { clientX, clientY, delta, transform }
              saveDraggableInfo(id, { transform: img.style.transform });
            },
          });
          return;
        }
      });
    };

    const icons = document.querySelectorAll(".icon");
    function onIconClick(e) {
      const id = Date.now().toString();
      const iconUrl = e.target.getAttribute("data-icon-url");
      addDraggableIcon({ id, icon: iconUrl });
      saveDraggableInfo(id, { icon: iconUrl });
      // draggables.push(subjx(img));
      onDraggableItemClick(id);
    }

    icons.forEach((icon) => {
      icon.addEventListener("click", onIconClick);
    });

    //Handle delete button

    function onDeleteClick(e) {
      console.log(selectedId);
      if (selectedId < 0) return;
      const draggableIndex = draggables.findIndex(
        (item) => item?.id === selectedId
      );
      draggables[draggableIndex].disable();
      document.querySelector(`[data-id="${selectedId}"]`).remove();

      const storedData = getObjJson();
      if (storedData?.draggables) {
        const i = storedData.draggables.findIndex(
          (item) => item?.id === selectedId
        );
        if (i > -1) storedData.draggables.splice(i, 1);
        saveObjJson(storedData);
      }

      selectedId = -1;
    }
    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", onDeleteClick);

    //#region change background

    const mesh = document.getElementById("mesh");
    const storedData = getObjJson();
    if (storedData === "") {
      navigator("/");
    }
    const backgroundName = storedData.background.replace("icon", "show");
    if (ShowPatternImages[backgroundName].type === "rectangular") {
      mesh.style.backgroundImage = `url("${ShowPatternImages[backgroundName].url}")`;
      mesh.style.backgroundSize = "100% 100%";
    }
    mesh.style.backgroundImage = `url("${ShowPatternImages[backgroundName].url}")`;
    //#endregion

    //#region change main logo
    // const mainLogo = document.getElementById("logo");
    // const logoNum = parseInt(storedData.logo, 10); //number
    // mainLogo.src = `${Object.values(LogoImages)[logoNum]}`;
    // mainLogo.setAttribute(
    //   "data-icon-url",
    //   `${Object.values(LogoImages)[logoNum]}`
    // );
    //#endregion
    initDraggables();
    return () => {
      draggables.forEach((item) => {
        if (!item) return;
        item.disable();
        item.elements.forEach((el) => el.parentNode?.removeChild(el));
      });
      icons.forEach((item) => {
        if (!item) return;
        item.removeEventListener("click", onIconClick);
      });
      deleteButton.removeEventListener("click", onDeleteClick);
    };
  }, []);
  //#endregion
  return (
    <>
      <button id="delete"></button>
      <div className="custom">
        <div id="container-wrapper">
          <div id="mesh" className="container"></div>
        </div>
        <div id="mask">
          <img src={maskSamsum} alt="" />
        </div>
      </div>
      <div id="icon-list">
        {/* <img
          id="logo"
          className="icon"
          src={LogoImages.Logo1}
          data-icon-url={LogoImages.Logo1}
          alt=""
        // Num=""
        /> */}

        {Array.from({ length: 117 }, (_, i) => i + 1).map((num) => (
          <img
            key={num}
            className="icon"
            src={IconStickerImages[`icon_(${num}).webp`]}
            data-icon-url={ShowStickerImages[`icon_(${num}).webp`]}
            alt=""
          />
        ))}
      </div>
    </>
  );
};

export default StickerPage;
