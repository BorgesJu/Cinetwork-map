/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

const popupContent = [
  {
    title: 'Popup 1',
    content: 'This is the first popup.'
  },
  {
    title: 'Popup 2',
    content: 'This is the second popup.'
  },
  {
    title: 'Popup 3',
    content: 'This is the third popup.'
  }
];

let currentPopupIndex = 0;




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
	


	WA.room.onEnterLayer('welcomeZone').subscribe(() => {
		currentPopup = WA.ui.openPopup("welcomePopup", popupContent[currentPopupIndex].title, [
			{
				type: 'primary',
				label: 'Next',
				action: () => {
					// Increment the current popup index
					currentPopupIndex++;
					// If the index is out of bounds, set it to 0
					if (currentPopupIndex >= popupContent.length) {
						currentPopupIndex = 0;
					}
					// Update the popup content
					currentPopup.update({
						title: popupContent[currentPopupIndex].title,
						content: popupContent[currentPopupIndex].content
					});
				}
			},
			{
				type: 'secondary',
				label: 'Previous',
				action: () => {
					// Decrement the current popup index
					currentPopupIndex--;
					// If the index is out of bounds, set it to the last element in the array
					if (currentPopupIndex < 0) {
						currentPopupIndex = popupContent.length - 1;
					}
					// Update the popup content
					currentPopup.update({
						title: popupContent[currentPopupIndex].title,
						content: popupContent[currentPopupIndex].content
					});
				}
			}
		]);
	});














	

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

export {};
