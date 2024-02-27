document.addEventListener("DOMContentLoaded", () => {
  FillTvPrograms("Dump TV");
  SetDefaultTvChannel();
  
});


const channelOptions = document.querySelectorAll(".channel-option");

channelOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    const activeChannelOption = document.querySelector(
      ".channel-option-active"
    );
    activeChannelOption.classList.remove("channel-option-active");

    e.currentTarget.classList.add("channel-option-active");

    const currentCategory = e.currentTarget.dataset.type;
    FillTvPrograms(`Dump ${currentCategory}`);
  });
});

const GetPrograms = async () => {
  return (programs = await ReadData());
};

async function FillTvPrograms(category) {
  const programs = await GetPrograms();

  const tvProgramContainer = document.querySelector(".tv-program");
  tvProgramContainer.innerHTML = "";

  const tvPrograms = programs.map((program) => {
    return program.channel === category ? program : null;
  });

  tvPrograms.forEach((program) => {
    if (program) {
      const programInstance = document.createElement("div");
      programInstance.innerHTML = `
        <a class="tv-program-item dump-tv-item" data-id="${program.id}">
          <h4 class="time">${program?.start_date}-${program?.start_time}</h4>
          <h4 class="category">${program?.category}</h4>
          <h4 class="program-name">${program?.name}</h4>
          <h4 class="replay">${
            program?.is_replay === "Da" ? "Repriza" : ""
          }</h4>
        </a>
      `;

      tvProgramContainer.append(programInstance);
    }
  });

  const programItems = document.querySelectorAll(".tv-program-item");
  programItems.forEach((program) => {
    program.addEventListener("click", async (e) => {
      let popupModal = document.querySelector(".popup");

      const wantedProgram = tvPrograms.find(
        (el) => el?.id === Number(e.currentTarget.dataset.id)
      );
      let pin = 1111;
      try {
        if (!wantedProgram.for_children) {
          let accessGranted = await CheckPin(pin);
          if (accessGranted) {
            popupModal.style.display = "flex";
            const body = document.querySelector("body");
            body.classList.add("disable-scroll");
            popupModal = FillInTheModal(popupModal, wantedProgram);
          }
        } else {
          popupModal.style.display = "flex";
          const body = document.querySelector("body");
          body.classList.add("disable-scroll");
          popupModal = FillInTheModal(popupModal, wantedProgram);
        }
      } 
      catch (error) {
        console.error(error);
      }

      const closeModalImg = document.querySelector(".close-modal");
      closeModalImg.addEventListener("click", () => {
        popupModal.style.display = "none";
        body.classList.remove("disable-scroll");
      });
    });
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

  </div>
  `;
  return element;
};

async function ReadData() {
  const response = await fetch("./data.json");
  const programs = await response.json();

  return programs;
}

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

function SetDefaultTvChannel() {
  const channelOptions = document.querySelectorAll(".channel-option");
  channelOptions[0].classList.add("channel-option-active");
}

async function CheckIfProgramIsProtected() {
  programs = ReadData();
  console.log(programs);
}

// document.addEventListener("DOMContentLoaded", () => {
//     const previewDetails = {};

//     document.querySelectorAll(".tv-program a").forEach((el) => {
//       el.addEventListener("mouseover", async () => {
//         const previewDetailsEl = el.querySelector(".preview-tooltip");
//         if (previewDetailsEl) {
//           return;
//         }

//         console.log(el);

//         if (!(el.href in previewDetailsEl)) {
//           previewDetailsEl[el.href] = await getPreviewData(el.href);
//         }

//         el.insertAdjacentHTML(
//           "beforeend",
//           `<span class="preview-tooltip">
//              <span>${previewDetailsEl[el.href].description}</span>
//              <span>${previewDetailsEl[el.href].name}</span>
//            </span>`
//         );
//       });
//     });

//     document.querySelectorAll(".tv-program a").forEach((el) => {
//       el.addEventListener("mouseleave", () => {
//         const previewTooltipEl = el.querySelector(".preview-tooltip");
//         if (previewTooltipEl) {
//           previewTooltipEl.remove();
//         }
//       });
//     });
//   });

//   const getPreviewData = (href) => {
//     return new Promise((resolve, reject) => {
//       fetch(href)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           const { title, date, time, category, replay, description } = data;
//           resolve({ title, date, time, category, replay, description });
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };

//--------------------------------
//popup example
