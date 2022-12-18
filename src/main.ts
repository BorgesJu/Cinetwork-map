/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    });

    WA.room.onLeaveLayer('clockZone').subscribe(closePopup);
	
	

    WA.room.onEnterLayer('beachZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("beachPopup", "Welcome to the Benchley bay!", []);
    });

    WA.room.onLeaveLayer('beachZone').subscribe(closePopup);
	
	
	
    WA.room.onEnterLayer('poolZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("poolPopup", "Welcome to the Michel Delassalle pool!", []);
    });

    WA.room.onLeaveLayer('poolZone').subscribe(closePopup);
	
	
    WA.room.onEnterLayer('mazeZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("mazePopup", "It's aMAZE-ing how this place is overlooked!", []);
    });

    WA.room.onLeaveLayer('mazeZone').subscribe(closePopup);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}



let helloWorldPopup;

const pages = [
  { title: 'Page 1', content: 'This is page 1' },
  { title: 'Page 2', content: 'This is page 2' },
  { title: 'Page 3', content: 'This is page 3' },
];

let currentPageIndex = 0;

// Open the popup when we enter a given zone
WA.room.onEnterLayer("welcomeZone").subscribe(() => {
    helloWorldPopup = WA.ui.openPopup("welcomePopup", pages[currentPageIndex].title, [
        {
            label: 'Previous',
            className: 'secondary',
            callback: (popup) => {
              currentPageIndex--;
              if (currentPageIndex < 0) {
                currentPageIndex = pages.length - 1;
              }
              popup.update({
                title: pages[currentPageIndex].title,
                content: pages[currentPageIndex].content,
              });
            },
        },
        {
            label: 'Next',
            className: 'primary',
            callback: (popup) => {
              currentPageIndex++;
              if (currentPageIndex >= pages.length) {
                currentPageIndex = 0;
              }
              popup.update({
                title: pages[currentPageIndex].title,
                content: pages[currentPageIndex].content,
              });
            },
        },
        {
            label: "Close",
            className: "primary",
            callback: (popup) => {
                // Close the popup when the "Close" button is pressed.
                popup.close();
            }
        }
    ]);
});

// Close the popup when we leave the zone.
WA.room.onLeaveLayer("myZone").subscribe(() => {
    helloWorldPopup.close();
});










export {};
