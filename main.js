// elemntos del DOM

const translateFrom = document.querySelector('#translateFrom');
const translateTo = document.querySelector('#translateTo');
const translate = document.querySelector('#translate');
const inputTranslateFrom = document.querySelector("#inputTranslateFrom");
const translateEnd = document.querySelector("#outputTranslateTo");


// Conseguir la lista de lenguajes desde el servidor:::

const GET_URL = "https://text-translator2.p.rapidapi.com/getLanguages";

const OPTIONS = {
  method: "get",
  headers: {
    "X-RapidAPI-Key": '2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c',
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com"
  }
}

let sourceLenguage ='es';
let targetLenguage;

fetch(GET_URL, OPTIONS)
  .then((res) => res.json())
    .then((objeto) => {
        const lenguages = objeto.data.languages;
        console.log()
    //   Codigo para los label.
        lenguages.forEach((e) => {
            translateFrom.innerHTML += `<option value="${e.code}">${e.name}</option>`;
            translateTo.innerHTML += `<option value="${e.code}">${e.name}</option>`;
                   
        });

        translateFrom.addEventListener('click', () => { // Desde este lenguaje
            console.log(translateFrom.value); // Entonces lo voy a meter en una variable
            sourceLenguage = translateFrom.value;
        
        })    

        translateTo.addEventListener("click", () => { // Hasta este otro Lenguaje
          console.log(translateTo.value);  // Este tamnbien lo voy a meter en una variable
            targetLenguage = translateTo.value;
        });
  })
  .catch((err) => console.error('No se pudo consolidar tu peticion'));
 


//   Aca vamos a hacer la traduccion De manera que recogeremos los datos del input para enviarlos al servidor (post)

translate.addEventListener('click', () => {
    let textToTranslate = (inputTranslateFrom.value);
    
    
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", sourceLenguage);
    encodedParams.append("target_language", targetLenguage);
    encodedParams.append("text", textToTranslate);

    const options = {
    method: "POST",
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: encodedParams,
    };

    fetch("https://text-translator2.p.rapidapi.com/translate", options)
    .then((response) => response.json())
    .then((response) => translateEnd.value = response.data.translatedText) // Ahora para no imprimirla sino mostrarla por pantalla creare el Dom arriba
    .catch((err) => console.error(err));
    })
