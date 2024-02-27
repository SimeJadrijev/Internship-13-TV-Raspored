document.addEventListener("DOMContentLoaded", () => {
  // const tvPrograms = document.querySelectorAll(".tv-program a");
  // tvPrograms.forEach( (el) => {
  //   el.addEventListener("click", async () => {
  //     const popupModal = document.querySelector(".popup");
      
  //     // popupModal.style.display = "flex";
  //   })
  // })
})

document.addEventListener("DOMContentLoaded", async () => {
  const programs = await ReadData();

  const tvProgramContainer = document.querySelector(".tv-program");
  const tvPrograms = FillTvPrograms(programs, "Dump TV");

  tvPrograms.forEach(program => {
    if (program) {

      const programInstance = document.createElement("div");
      programInstance.innerHTML = `
        <a class="tv-program-item dump-tv-item">
          <h4 class="time">${program?.start_date}-${program?.start_time}</h4>
          <h4 class="category">${program?.category}</h4>
          <h4 class="program-name">${program?.name}</h4>
          <h4 class="replay">${program?.is_replay === "Da" ? "Repriza" : ""}</h4>
        </a>
      `;
  
      tvProgramContainer.append(programInstance); 

    }
      
  });
})

function FillTvPrograms(programs, category) {

  return programs.map(program => {

    return program.channel === category ? program : null; 

  });
  
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

const FillInTheModal = (element, program) => {
  element.innerHTML = `
  <div class="popup-top">
  <img src="./assets/svg/close.svg" alt="close icon">
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
        ${program.replay}
    </h3>
    <h3>
        <span class="popup-starting-property">
            Kanal:
        </span> 
        ${program.channel}
    </h3>

  </div>
  `
  return element;
}
  
async function ReadData() {
  const response = await fetch("./data.json");
  const programs = await response.json();
  console.log(programs);
  return programs;
}


