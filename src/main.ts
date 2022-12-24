/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.room.onEnterLayer("clockZone").subscribe(() => {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes();
      currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.onLeaveLayer("clockZone").subscribe(closePopup);

    WA.room.onEnterLayer("beachZone").subscribe(() => {
      currentPopup = WA.ui.openPopup(
        "beachPopup",
        "Welcome to the Benchley bay!",
        []
      );
    });

    WA.room.onLeaveLayer("beachZone").subscribe(closePopup);

    WA.room.onEnterLayer("poolZone").subscribe(() => {
      currentPopup = WA.ui.openPopup(
        "poolPopup",
        "Welcome to the Michel Delassalle pool!",
        []
      );
    });

    WA.room.onLeaveLayer("poolZone").subscribe(closePopup);

    WA.room.onEnterLayer("mazeZone").subscribe(() => {
      currentPopup = WA.ui.openPopup(
        "mazePopup",
        "It's aMAZE-ing how this place is overlooked!",
        []
      );
    });

    WA.room.onLeaveLayer("mazeZone").subscribe(closePopup);

    let currentTutorialPopupIndex: number = 0;
    const tutorialPopupData = [
      {
        title: "Welcome to Cinetworld! I'm Ju and I'm here to guide you...",
        message: "first",
        buttons: [{ label: "Next", callback: nextTutorialPopup }],
      },
      {
        title: "Cinetworld is a friendly professional place...",
        message: "second",
        buttons: [
          { label: "Previous", callback: previousTutorialPopup },
          { label: "Next", callback: nextTutorialPopup },
        ],
      },
      {
        title: "where you can interact with your connected colleagues in a natural and fun way...",
        message: "Third",
        buttons: [
          { label: "Previous", callback: previousTutorialPopup },
          { label: "Next", callback: nextTutorialPopup },
        ],
      },      
      {
        title: "Approach a user to chat with her/him, or to start a video chat...",
        message: "fourth",
          { label: "Previous", callback: previousTutorialPopup },
          { label: "Next", callback: nextTutorialPopup },
      },
      {
        title: "You can go to one of the dedicated spaces to start a multiparty conference...",
        message: "fifth",
          { label: "Previous", callback: previousTutorialPopup },
          { label: "Next", callback: nextTutorialPopup },
      },
      {
        title: "You can finally go to one of the quiet spaces if you do not wish to be disturbed...",
        message: "sixth",
          { label: "Previous", callback: previousTutorialPopup },
          { label: "Next", callback: nextTutorialPopup },
      },
      {
        title: "Enjoy your visit and discover Cinetworld and its many secrets!",
        message: "seventh",
        buttons: [{ label: "Previous", callback: previousTutorialPopup }],
      },       
    ];

    function nextTutorialPopup() {
      currentTutorialPopupIndex++;
      openTutorialPopup(currentTutorialPopupIndex);
    }

    function previousTutorialPopup() {
      currentTutorialPopupIndex--;
      openTutorialPopup(currentTutorialPopupIndex);
    }

    const clamp = (num: number, min: number, max: number) =>
      Math.min(Math.max(num, min), max);
    function openTutorialPopup(index: number) {
      index = clamp(index, 0, tutorialPopupData.length - 1);
      const data = tutorialPopupData[index];
      if (currentPopup) {
        currentPopup.close();
      }
      currentPopup = WA.ui.openPopup("welcomePopup", data.title, data.buttons);
    }

    WA.room.onEnterLayer("welcomeZone").subscribe(() => {
      openTutorialPopup(currentTutorialPopupIndex);
    });

    WA.room.onLeaveLayer("welcomeZone").subscribe(() => {
      currentPopup.close();
      currentPopup = undefined;
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
