var __stage = 1;
var __order;
var __trialCount;
var __stageLength;
var __trialStart;
var __imgCat = ["Piel clara", "Piel oscura"];
var __wrdCat = ["Bueno", "Malo"];
var __imgLabel = ["white", "dark"];
var __wrdLabel = ["good", "bad"]
var __instructions = false;
var __left;
var __right;
var __results = {};
var myAPI;

//Función para generar un entero aleatorio
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Función para controlar presión de teclas
function keyHandler(e, v = false, c) {
    //Inicializamos variable para guardar código de tecla
    var keyCode;

    //IE y otros exploradores
    if (window.event) { // IE                    
        keyCode = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                   
        keyCode = e.which;
    }

    //Obtenemos tecla apretada
    var keyName = String.fromCharCode(keyCode);
    //En caso de barra espaciadora
    if (keyName === " ") {
        keyName = "space";
    }
    //Enviamos a log
    if (v) {
        console.log("Key pressed:" + keyName);
    }
    //Si hay callback
    if (c) {
        c(keyName);
    } else {
        return keyName;
    }
}

//Función que procesa la acción asignada a las teclas
function keyCallBack(keyName) {
    if (__instructions) {
        if (keyName == "space") {
            myAPI.endPoints.GET_stimuli(__stage);
            __instructions = false;
        }
    } else {
        if (keyName == "space") {
            return false
        }
        if (keyName == "e") {
            iatAnswer(keyName);
        }
        if (keyName == "i") {
            iatAnswer(keyName);
        }
    }
}

//Función que se activa cuando el usuario responde un estímulo
function iatAnswer(key) {
    const humanIndex = __trialCount + 1;
    const holder = `#stimHolder_${humanIndex}`;
    const currentLabel = $(holder).attr("label");
    if (key == "e") {
        if (__left.includes(currentLabel)) {
            const ellapsed = getLatency();
            saveTrial(ellapsed);
            console.log(`correcto (${ellapsed} ms)`);
            hideText("info");
            __trialCount += 1;
            playIAT();
        } else {
            console.log("incorrecto");
            showError();
        }
    } else {
        if (__right.includes(currentLabel)) {
            const ellapsed = getLatency();
            saveTrial(ellapsed);
            console.log(`correcto (${ellapsed} ms)`);
            hideText("info");
            __trialCount += 1;
            playIAT();
        } else {
            console.log("incorrecto");
            showError();
        }
    }
}

//Función para registrar la latencia
function getLatency() {
    const Now = new Date();
    const diff = Math.abs(Now - __trialStart);
    return diff;
}

//Función para guardar los resultados
function saveTrial(latency) {
    //Obtener el stage en el que estamos (en índice 0)
    const stage = __stage - 1;
    //Obtenemos el tipo de estímulo y su contenido
    const humanIndex = __trialCount + 1;
    const holder = `#stimHolder_${humanIndex}`;
    const stimLabel = $(holder).attr("label");
    const stimType = $(holder).attr("type");
    const stimValue = $(holder).attr("val");
    //Creamos un objeto con la información del estímulo
    const stimObj = {
        latency: latency,
        type: stimType,
        label: stimLabel,
        value: stimValue
    };
    //Lo agregamos
    __results[`round_${__stage}`].push(stimObj);
}

//Función que se activa cuando el usuario comete un error
function showError() {
    //Elementos donde se encuentra nuestro texto
    var errorMark = $("#errorMrk");
    var errorMsg = $("#errorMsg")
    //Los mostramos
    errorMark.show();
    errorMsg.show();
}

//Función para asignar labels a las columnas
function assignLabelsAndText(stageType, inverse) {

    //Definimos variables (elementos donde guardamos el texto)
    var leftColTxt = $("#leftColTxt");
    var rightColTxt = $("#rightColTxt");
    var leftImgLabel = leftColTxt.children("span")[0];
    var leftOr = leftColTxt.children("span")[1];
    var leftWrdLabel = leftColTxt.children("span")[2];
    var rightImgLabel = rightColTxt.children("span")[0];
    var rightOr = rightColTxt.children("span")[1];
    var rightWrdLabel = rightColTxt.children("span")[2];

    //Si estamos en un bloque donde volteamos el orden de las columnas
    var order = __order;
    if (inverse) {
        if (order === 0) {
            order = 1;
        } else if (order === 1) {
            order = 0;
        }
    }

    //Dependiendo del orden que se le asigno a la persona, creamos un modifcador
    const modifier = (order === 0) ? 1 : -1;

    //Dependiendo del tipo de bloque, llenamos distintas variables
    //Un bloque con palabras e imágenes
    if (stageType == "word&img") {
        //Asignamos los labels
        __left = [__wrdLabel[order], __imgLabel[order]];
        __right = [__wrdLabel[order + (1 * modifier)], __imgLabel[order + (1 * modifier)]];
        //Cambiamos el texto
        leftImgLabel.innerText = __imgCat[order];
        rightImgLabel.innerText = __imgCat[order + (1 * modifier)];
        leftWrdLabel.innerText = __wrdCat[order];
        rightWrdLabel.innerText = __wrdCat[order + (1 * modifier)];
        //Mostramos los campos
        leftImgLabel.style.display = "block";
        leftOr.style.display = "block";
        leftWrdLabel.style.display = "block";
        rightImgLabel.style.display = "block";
        rightOr.style.display = "block";
        rightWrdLabel.style.display = "block";

        //Un bloque con solo palabras
    } else if (stageType == "word") {
        //Asignamos los labels
        __left = [__wrdLabel[order]];
        __right = [__wrdLabel[order + (1 * modifier)]];
        //Cambiamos el texto
        leftWrdLabel.innerText = __wrdCat[order];
        rightWrdLabel.innerText = __wrdCat[order + (1 * modifier)];
        //Mostramos los campos
        leftWrdLabel.style.display = "block";
        rightWrdLabel.style.display = "block";

        //Un bloque con solo imagenes
    } else if (stageType == "img") {
        //Asignamos los labels
        __left = [__imgLabel[order]];
        __right = [__imgLabel[order + (1 * modifier)]];
        //Cambiamos el texto
        leftImgLabel.innerText = __imgCat[order];
        rightImgLabel.innerText = __imgCat[order + (1 * modifier)];
        //Mostramos los campos
        leftImgLabel.style.display = "block";
        rightImgLabel.style.display = "block";

    } else {
        throw "Invalid stageType";
    }
}

//Función para ocultar todo el texto de la página
function hideText(which) {
    //Definimos variables (elementos donde guardamos el texto)
    //Texto de las columnas
    var leftColTxt = $("#leftColTxt");
    var rightColTxt = $("#rightColTxt");
    var leftImgLabel = leftColTxt.children("span")[0];
    var leftOr = leftColTxt.children("span")[1];
    var leftWrdLabel = leftColTxt.children("span")[2];
    var rightImgLabel = rightColTxt.children("span")[0];
    var rightOr = rightColTxt.children("span")[1];
    var rightWrdLabel = rightColTxt.children("span")[2];
    //Texto en el centro
    var roundCounter = $("#rndCount");
    var errorMark = $("#errorMrk");
    var errorMsg = $("#errorMsg")

    //Ocultamos el texto dependiendo de lo que nos pidio el usuario
    switch (which) {

        case "columns":
            leftImgLabel.style.display = "none";
            rightImgLabel.style.display = "none";
            leftOr.style.display = "none";
            rightOr.style.display = "none";
            leftWrdLabel.style.display = "none";
            rightWrdLabel.style.display = "none";

            break;

        case "info":
            roundCounter.hide();
            errorMark.hide();
            errorMsg.hide();
            break;
    }

}

//Función para mostrar instrucciones
function showInstructions() {
    __instructions = true;
    //Colocar títulos 
    switch (__stage) {
        case 1:
            assignLabelsAndText("word", false);
            break;
        case 2:
            assignLabelsAndText("img", false);
            break;
        case 3:
            assignLabelsAndText("word&img", false);
            break;
        case 4:
            assignLabelsAndText("word&img", false);
            break;
        case 5:
            assignLabelsAndText("word", true);
            break;
        case 6:
            assignLabelsAndText("word&img", true);
            break;
        case 7:
            assignLabelsAndText("word&img", true);
            break;
    }
}

//Función para colocalr estímulos
function placeStimuli(stimuliArray) {
    //Guardar tamaño de prueba
    __stageLength = stimuliArray.length;
    //Colocar estímulos
    for (let i = 0; i < stimuliArray.length; i++) {
        const humanIndex = i + 1;
        const holder = `#stimHolder_${humanIndex}`;
        const stimuli = stimuliArray[i];
        const stimuliType = stimuli.type;
        const stimuliLabel = stimuli.label;
        const stimuliContent = stimuli.content;
        //Ocultamos el holder
        $(holder).hide();
        //Imagen o palabra?
        if (stimuliType == "img") {
            // Contenido del estímulo
            $(holder).html(`<img src='../imgs/stimuli/${stimuliContent}.jpg'>`);
        } else {
            // Contenido del estímulo
            $(holder).html(stimuliContent);
        }
        // Agregamos información del estímulo (categoría, tipo y contenido)
        $(holder).attr("label", stimuliLabel);
        $(holder).attr("type", stimuliType);
        $(holder).attr("val", stimuliContent);
        //Cuando las imágenes ya se cargaron
        $('.stimuli').imagesLoaded(function () {
            //Ocultar el spiner
            $("#loader").hide();
            //Ir a función que muestra estímulos
            __trialCount = 0;
            playIAT();
        });
    }
}

//Función para jugar al IAT
function playIAT() {
    const humanIndex = __trialCount + 1;
    //Cuántos estímulos hay? Si ya hicimos más, salir al siguiente bloque
    if (__trialCount < __stageLength) {
        //Si no es el primero, ocultar último holder en aparecer
        if (__trialCount != 0) {
            $(`#stimHolder_${humanIndex - 1}`).hide();
        }
        //Mostrar estímulo
        $(`#stimHolder_${humanIndex}`).show();
        //Iniciar conteo
        __trialStart = new Date();
    } else {
        $(`#stimHolder_${humanIndex - 1}`).hide();
        __stage += 1;
        IATloop();
    }
}

//Función principal del IAT
function IATloop() {
    $("#loader").hide();
    // Verificar en qué stage estamos
    if (__stage > 7) {
        //Salir
    } else if (__stage == 1) {
        //Determinar orden
        __order = randomInt(0, 1);
    }

    // Guardar el stage en el objeto de resultados
    var stageObj = [];
    __results[`round_${__stage}`] = stageObj;

    //Cambiamos el texto indicando en qué ronda nos encontramos
    $("#rndCount").text(`Ronda ${__stage} de 7`);
    //Ocultamos el texto de las columnas
    hideText("columns");
    //Ocultamos el texto de información
    hideText("info")
    //Cargamos instrucciones
    showInstructions();
}

//Cuando el documento se carga
$(document).ready(function () {
    //Verificar ancho y alto de la página
    const h = $(window).height();
    const w = $(window).width();
    if (w < 480 || h < 830) {
        //alert("La resolución de tu dispositivo es muy pequeña para realizar esta prueba. Por favor, ajusta la resolución y recarga la página");
    }
    //Ir al inicio de la página
    $('html,body').scrollTop(0);
    //Iniciar IAT
    IATloop();
    //Desactivar acciones por default en teclas y asignar el keyHandler
    $(document).keypress(function (e) {
        e.preventDefault();
        keyHandler(e, false, keyCallBack);
    });
});