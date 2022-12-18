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





	const messages = [
	  "This is message 1",
	  "This is message 2",
	  "This is message 3",
	];

	let messageIndex = 0;


	WA.room.onEnterLayer('welcomeZone').subscribe(() => {
	  currentPopup = WA.ui.openPopup("welcomePopup", messages[messageIndex], [
		{
		  label: "Previous",
		  className: "primary",
		  callback: (popup) => {
			if (messageIndex > 0) {
			  messageIndex--;
			  popup.close();
			  currentPopup = WA.ui.openPopup("welcomePopup", messages[messageIndex], []);
			}
		  },
		},
		{
		  label: "Next",
		  className: "primary",
		  callback: (popup) => {
			if (messageIndex < messages.length - 1) {
			  messageIndex++;
			  popup.close();
			  currentPopup = WA.ui.openPopup("welcomePopup", messages[messageIndex], []);
			}
		  },
		},
	  ]);
	});

	WA.room.onLeaveLayer('welcomeZone').subscribe(closePopup);



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
