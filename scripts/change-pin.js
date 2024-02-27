import pin  from "./preview-details";

const oldPinElement = document.getElementById("old-pin");
const newPinElement = document.getElementById("new-pin");
const confirmNewPin = document.getElementById("confirm-pin");
const okButton = document.getElementById("check-pin-button");
console.log(okButton);
okButton.addEventListener("click", () => {
    let oldPinValue = oldPinElement.value;
    let newPinValue = newPinElement.value;
    let confirmNewPinValue = confirmNewPin.value;
    //note for later: add descriptions for errors
    if ( OldPinIsCorrect(pin, oldPinValue) ) 
    {
        if ( PinIsCorrectLength(newPinValue) )
            if ( PinsAreTheSame(newPinValue, confirmNewPinValue) )
                pin = newPinValue;
    }
    oldPinValue = "";
    newPinValue = "";
    confirmNewPinValue = "";
    
})

function OldPinIsCorrect(oldPin, usersOldPin) {
    oldPin = Number(oldPin);
    usersOldPin = Number(usersOldPin);

    if (oldPin === usersOldPin)
        return true;
    return false;
}

function PinsAreTheSame(newPin, confirmedNewPin) {
    newPin = Number(newPin);
    confirmedNewPin = Number(confirmedNewPin);
   
    if (newPin === confirmedNewPin)
       return true;
    return false;
}

function PinIsCorrectLength(newPin) {
    if (newPin >= 1000 && newPin <= 99999999 )
        return true;
    return false;
}
