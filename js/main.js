const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//Numero
//Tenga Información
//Tiene que ser un número 
//Mayot quue 0.
//Name
//Validar que tenga información mínimo 3 letras
        //mensaje de error 

//Tiene que ser un número 
//Mayot quue 0.    
function validarCantidad(){

    if (txtNumber.value.length==0){
        return false;
    }//tenga informacion
   
    if(isNaN(txtNumber.value)){
        return false;
    }//Tiene que ser un numero

    if(Number(txtNumber.value)<=0){
        return false;
    }//
    return true;
}

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";
    
//Name
//Validar que tenga información mínimo 3 letras
    if(txtName.value.length<3){
        //mensaje de error 
        txtName.style.border="thin red solid";
        //se agrega estilo para cuando no se da la condicion 
        //para resaltar el campo erroneo
        alertValidacionesTexto.innerHTML="<strong> El nombre del producto no es correcto </strong>"
        alertValidaciones.style.display="block";
    }// termina la primera validacion

    if(! validarCantidad()){
        txtNumber.style.border="thin red solid";
        //se agrega estilo para cuando no se da la condicion 
        //para resaltar el campo erroneo
        alertValidacionesTexto.innerHTML += "<strong> La cantidas del producto no es correcta </strong><br/>";
        alertValidaciones.style.display="block";
    }
    


//Numero
//Tenga Información
//Tiene que ser un número 
//Mayot quue 0.

});
