import { pin } from "./preview-details";

const oldPinElement = document.getElementById("old-pin");
const newPinElement = document.getElementById("new-pin");
const confirmNewPin = document.getElementById("confirm-pin");
const okButton = document.getElementById("check-pin-button");

okButton.addEventListener("click", () => {
    let oldPinValue = oldPinElement.value;
    let newPinValue = newPinElement.value;
    let confirmNewPinValue = confirmNewPin.value;

    if ( CheckIfOldPinIsCorrect(pin, oldPinValue) )
    {
        if ( CheckIfPinsAreTheSame(newPinValue, confirmNewPinValue) )
            pin = newPinValue;
    }
    
})

function CheckIfOldPinIsCorrect(oldPin, usersOldPin) {
    oldPin = Number(oldPin);
    usersOldPin = Number(usersOldPin);

    if (oldPin === usersOldPin)
        return true;
    return false;
}

function CheckIfPinsAreTheSame(newPin, confirmedNewPin) {
    newPin = Number(newPin);
    confirmedNewPin = Number(confirmedNewPin);
   
    if (newPin === confirmedNewPin)
       return true;
    return false;
}
export let pin;