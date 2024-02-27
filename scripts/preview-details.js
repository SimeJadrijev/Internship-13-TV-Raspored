import { CheckPin } from "./check-pin.js";

document.addEventListener("DOMContentLoaded", () => {
  FillTvPrograms("Dump TV");
  SetDefaultTvChannel();
});


const channelOptions = document.querySelectorAll(".channel-option");

channelOptions.forEach((option) => {

  option.addEventListener("click", (e) => {
    // highlight the tv channel whose programs are being shown
    const activeChannelOption = document.querySelector(".channel-option-active");
    activeChannelOption.classList.remove("channel-option-active");
    e.currentTarget.classList.add("channel-option-active");

    const currentCategory = e.currentTarget.dataset.type;
    FillTvPrograms(`Dump ${currentCategory}`);  //show the programs of that (chosen) tv channel
  });
});

async function FillTvPrograms(category) {
  const programs = await GetPrograms();

  const tvProgramContainer = document.querySelector(".tv-program");
  tvProgramContainer.innerHTML = "";  //delete the previous tv programs from the container

  const tvPrograms = programs.map((program) => {
    return program.channel === category ? program : null; // if the program is NOT supposed to be shown on that tv channel, mark it as null
  });

  AddProgramsToContainer(tvPrograms, tvProgramContainer);

  const programItems = document.querySelectorAll(".tv-program-item");
  programItems.forEach((program) => {
    program.addEventListener("click", async (e) => {
      let popupModal = document.querySelector(".popup");

      const wantedProgram = FindProgramById(tvPrograms, e);
      console.log(wantedProgram.rating);

      let pin = 1111;
      try {
        if (!wantedProgram.for_children) {  // if the chosen program is labeled as "not for children"
          let accessGranted = await CheckPin(pin);  //check the pin
          if (accessGranted) {                // if the pin is correct, show the popup modal (program details)
            popupModal.style.display = "flex";
            popupModal = FillInTheModal(popupModal, wantedProgram);
          }
        }
        else {    // if the program is labeled as "for children", procede to show the popup modal without the pin
          popupModal.style.display = "flex";
          DisableScroll();
          popupModal = FillInTheModal(popupModal, wantedProgram);
        }
        ChangeRating(wantedProgram);
      }
      catch (error) {
        console.error(error);
      }

      const closeModalImg = document.querySelector(".close-modal");
      closeModalImg.addEventListener("click", () => { // if user clicks the close icon, close the modal
        popupModal.style.display = "none";
        EnableScroll();
      });
    });
  });
}


  // BASIC FUNCTIONS
  async function ReadData() {
    const response = await fetch("./data.json");
    const programs = await response.json();

    return programs;
  }

  function SetDefaultTvChannel() {
    const channelOptions = document.querySelectorAll(".channel-option");
    channelOptions[0].classList.add("channel-option-active");
  }

  const GetPrograms = async () => {
    return await ReadData();
  };

  function DisableScroll() {
    const body = document.querySelector("body");
    body.classList.add("disable-scroll");
  }

  function EnableScroll() {
    const body = document.querySelector("body");
    body.classList.remove("disable-scroll");
  }

  function FindProgramById(tvPrograms, e) {
    return tvPrograms.find(
      (el) => el?.id === Number(e.currentTarget.dataset.id)
    )
  }

  function AddProgramsToContainer(tvPrograms, tvProgramContainer) {
    tvPrograms.forEach((program) => {
      if (program) {
        // create programInstance and add it to the container
        const programInstance = document.createElement("div");
        programInstance.innerHTML = `
        <a class="tv-program-item dump-tv-item" data-id="${program.id}">
          <h4 class="time">${program?.start_date}-${program?.start_time}</h4>
          <h4 class="category">${program?.category}</h4>
          <h4 class="program-name">${program?.name}</h4>
          <h4 class="replay">${program?.is_replay === "Da" ? "Repriza" : ""
          }</h4>
        </a>
      `;
        tvProgramContainer.append(programInstance);
      }
    });
  }

  const FillInTheModal = (element, program) => {
    element.innerHTML = `
  <div class="popup-top">
  <img class="close-modal" src="./assets/svg/close.svg" alt="close icon">
  </div>
  <div class="popup-bottom">
    <h3>
        <span class="popup-starting-property">
            Ime:
        </span> 
        ${program.name}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Kategorija:
        </span> 
        ${program.category}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Početak:
        </span> 
        ${program.start_date} - ${program.start_time}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Kraj:
        </span> 
        ${program.end_date} - ${program.end_time}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Opis:
        </span> 
        ${program.description}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Repriza:
        </span> 
        ${program?.is_replay}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Kanal:
        </span> 
        ${program.channel}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Dodaj u watchlist:
        </span> 
        <button id="add-to-watchlist-button">Dodaj</button>
    </h3>
    <h3 id="user-rating-container">
        <span class="popup-starting-property">
            Ocjena:
        </span> 
        <input type="number" id="user-rating">
        <button id="confirm-rating">OK</button>
        <p id="rating-error-description"></p>
    </h3>

  </div>
  `;
    return element;
  };

// ------------------------------------- doesn't work, but makes sense
// function ChangeRating(wantedProgram) {
//   const confirmRatingButton = document.getElementById("confirm-rating");
//   confirmRatingButton.addEventListener("click", () => {
//     const userInputRating = document.getElementById("user-rating").value;
//     const programId = wantedProgram.id;

//     if (!isNaN(userInputRating)) {
//       const newRating = Number(userInputRating);
//       UpdateProgramRating(programId, newRating); 
//     } else {
//       document.getElementById("rating-error-description").textContent = "Molimo unesite broj.";
//     }
//   });
// }
// function UpdateProgramRating(programId, newRating) {
//   fetch("./data.json")
//     .then(response => response.json())
//     .then(programs => {
//       const programToUpdate = programs.find(program => program.id === programId);
//       if (programToUpdate) {
//         programToUpdate.rating = newRating;
//         SaveUpdatedPrograms(programs);
//       } 
//       else
//         console.error("Program nije pronađen.");
//     })
//     .catch(error => console.error("Greška prilikom ažuriranja ocjene programa:", error));
// }

// function SaveUpdatedPrograms(programs) {

//     const jsonString = JSON.stringify(programs);
//     localStorage.setItem("updatedPrograms", jsonString);
//     console.log("Ocjena programa uspješno ažurirana lokalno.");
// }



