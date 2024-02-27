function CheckPin(pin) {
    return new Promise((resolve, reject) => {
      pin = Number(pin);
      const pinCheckElement = document.querySelector(".pin-check");
      const sendPinButton = document.getElementById("send-pin");
      const closeModalButton = document.querySelector(".pin-check div img");
      const body = document.querySelector("body");
  
      closeModalButton.addEventListener("click", () => {
        pinCheckElement.style.display = "none";
        reject(new Error("Pin nije unesen"));
      });
  
      pinCheckElement.style.display = "flex";
      body.classList.add("disable-scroll");
  
      sendPinButton.addEventListener("click", () => {
        const inputElement = document.getElementById("pinInput");
        const userInput = inputElement.value;
  
        if (Number(userInput) === pin) {
          pinCheckElement.style.display = "none";
          inputElement.value = "";
          body.classList.add("disable-scroll");
          resolve(true);
        } else {
          inputElement.value = "";
          reject(new Error("Pogrešan pin"));
        }
      });
    });
}

export {CheckPin}