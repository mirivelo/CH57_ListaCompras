const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");




let contador = 0; // para contar los productos agregados
let totalEnProductos = 0; // para contar el total de productos
let costoTotal = 0; // para contar el costo total de los productos

let datos = new Array(); // guarda en un arreglo los objetos definidos en la tabla row

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
    let isValid = true; // para validar los campos de texto
   
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

//Name
//Validar que tenga información mínimo 3 letras
//mensaje de error 
//se agrega estilo para cuando no se da la condicion 
//para resaltar el campo erroneo

if(txtName.value.length<3){
        txtName.style.border="thin red solid";
        alertValidacionesTexto.innerHTML="<strong> El nombre del producto no es correcto </strong>"
        alertValidaciones.style.display="block";
        isValid = false;
    }
// termina la primera validacion

//se agrega estilo para cuando no se da la condicion 
//para resaltar el campo erroneo
    if(! validarCantidad()){
        txtNumber.style.border="thin red solid";        
        alertValidacionesTexto.innerHTML += "<strong> La cantidas del producto no es correcta </strong><br/>";
        alertValidaciones.style.display="block";
        isValid = false;
    }
///Validaciones de los campos ambos sean correctos 
    if(isValid){
        contador++;
        let precio = getPrecio();
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
      
        //se 
        let elemento = {
            "contador": contador,
            "nombre": txtName.value,
            "cantidad":txtNumber.value,
            "precio": precio
        };

      datos.push(elemento); 
      localStorage.setItem("datos",JSON.stringify(datos));
      
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
       
        contadorProductos.innerText = contador;
       
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText =(totalEnProductos);
       
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);
       
       //objeto para contener los elementos del resumen
       let resumen ={
        "contador": contador,
        "totalEnProductos":totalEnProductos,
        "costoTotal":costoTotal
       };
       //localstorage solo guarda cadenas de texto por lo que se 
       //usa JSON.stringify para convertir el objeto a cadena
       //y luego se guarda en el localstorage
       localStorage.setItem("resumen",JSON.stringify(resumen));
       
        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }//isvalid
});

btnClear.addEventListener("click",function(event){
    event.preventDefault();
//1.eliminar el localstorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
//2. limpiar la tabla
    cuerpoTabla.innerHTML = "";
//3. limpiar los campos
    txtName.value = "";
    txtNumber.value ="";
    txtName.focus();
//4. limpiar el borde de los campos
    txtName.style.border = "";
    txtNumber.style.border = "";

//5. limpiar los alerts
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
//6. limpiar el resumen
    contador = 0;
    productosTotal = 0;
    precioTotal = 0;

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);
    datos = new Array(); // reiniciar el arreglo de datos
    //reiniciar el localstorage


});


// pantalla

window.addEventListener("load", function(event){
    event.preventDefault();

    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach( (dato)=> {
            let row = ` <tr>
                <td>${dato.contador}</td>
                <td>${dato.nombre}</td>
                <td>${dato.cantidad}</td>
                <td>${dato.precio}</td>
            </tr>`;
cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }
    //Obtenemos el resumen del localstorage
    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        contador = resumen.contador;
}
    contadorProductos.innerText= contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);


});

/**Funcion para generar precios de manera aleatoria
 * con un valor entre 0 y 100
 *Precio aleatorio   
 */
function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}