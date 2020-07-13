
//Función para el botón de ok
function okBtn() {
    //Registrar acción en API
    myAPI.endPoints.POST_newUser("ok");
    //Ir a página de instrucciones
    window.location.href = "/IAT/static/src/instrucciones.php";
}

//Función para el botón de saber más
function infoBtn() {
    //Mostrar el PopUp
    $("#PopUp").show();
    $('html, body').animate({ scrollTop: 0}, 'fast');
}

//Función para el botón de cancelar
function noBtn() {
    //Registrar acción en API
    myAPI.endPoints.POST_newUser("declined");
    //Ir a Google
    window.location.href = "https://www.google.com.mx/";
}

//Función para el botón de cerrar popup
function closePopUpBtn() {
    //Cerrar el PopUp
    $("#PopUp").hide();
}

//Función para configurar botones
function setBtns() {
    //Botón ok
    $("#OkButton").click(okBtn);
    //document.getElementById("OkButton").addEventListener("click", okBtn);
    //Botón para mayor información
    $("#infoButton").click(infoBtn);
    //Botón para cancelar
    $("#NoButton").click(noBtn);
    //Botón que cierra el PopUp
    $("#PopUpClose").click(closePopUpBtn);
    //Si el usuario da click en cualquier lugar de la ventana, cerramos el PopUp
    $("#PopUp").click(closePopUpBtn).children().click(function (e) {
        return false;
    })
}

//Cuando el documento se carga
$(document).ready(function () {
    //Configuramos botones
    setBtns();
    //Inicializamos conector de API
    myAPI = new iatAPI();
    //Obtenemos nuevo usuario
    myAPI.endPoints.POST_newVisitor();
});