var ids= new Set();
var ent;
var num;

window.onload= function agregar(){
    ent= document.getElementById("h1").getAttribute("data-name")
    num= document.getElementById("h1").getAttribute("data-num")
    let elementos = document.querySelectorAll(".c0");    
    elementos.forEach(function(elemento) {
        ids.add(elemento.textContent)
    });
    console.log(ids)
}

function changeColor(){
    document.getElementById("modify").setAttribute("class", "btn btn-primary")
    document.getElementById("remove").setAttribute("class", "btn btn-primary")
    document.getElementById("inactivate").setAttribute("class", "btn btn-primary")
    document.getElementById("reactivate").setAttribute("class", "btn btn-primary")
}

function mod(){
    changeColor()
    document.getElementById("modify").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").removeAttribute("readonly")
}
 //Arrglar la devolucion al cambiar de opcion
function del(){
    changeColor()
    const nom= document.getElementById("nom" + document.getElementById("codMod").value).textContent
    document.getElementById("nomMod").value= nom
    document.getElementById("remove").setAttribute("class", "btn btn-danger")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").value= ("*")
}

function inac(){
    changeColor()
    const nom= document.getElementById("nom" + document.getElementById("codMod").value).textContent
    document.getElementById("nomMod").value= nom
    document.getElementById("inactivate").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").value= ("I")
}

function reac(){
    changeColor()
    const nom= document.getElementById("nom" + document.getElementById("codMod").value).textContent
    document.getElementById("nomMod").value= nom
    document.getElementById("reactivate").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").value= ("A")
}

function nuevo(){
    document.getElementById("codMod").removeAttribute("style")
    document.getElementById("nomMod").removeAttribute("style")
    document.getElementById("modify").setAttribute("disabled", "true")
    document.getElementById("remove").setAttribute("disabled", "true")
    document.getElementById("inactivate").setAttribute("disabled", "true")
    document.getElementById("reactivate").setAttribute("disabled", "true")

    document.getElementById("titMod").innerHTML= ("Agregando " + ent)
    document.getElementById("codMod").value = ""
    document.getElementById("codMod").removeAttribute("readonly")
    document.getElementById("nomMod").value = ""
    document.getElementById("nomMod").removeAttribute("readonly")
    document.getElementById("estMod").value = "A"

    document.getElementById("formMod").setAttribute("action", "/" + ent + "/add")
}

function verificar(campos){
    console.log(campos)

    const id= document.getElementById("codMod").value
    const nom= document.getElementById("nomMod").value
    const f= document.getElementById("formMod")
    if(id == ""){
        //document.getElementById("ErCod").textContent = "¡Introduzca un codigo!"
        document.getElementById("codMod").setAttribute("style","box-shadow: 0px 0px 1px 2px rgba(200, 0, 0, 0.5);")
        return;
    }
    if(document.getElementById("nomMod").value == ""){
        //document.getElementById("ErCod").textContent = "¡Introduzca el nombre del elemento!"
        document.getElementById("codMod").removeAttribute("style")
        document.getElementById("nomMod").setAttribute("style","box-shadow: 0px 0px 1px 2px rgba(200, 0, 0, 0.5);")
        return;
    }

    let elementos = document.querySelectorAll('[class="form-control mb-3"]');
    for (let i = 0; i < elementos.length - 1; i++) {
        const atr = elementos[i].value
        if(campos[i][1] == 1){ //Verifica si el tipo de dato es numerico
            if(isNaN(atr)){
                aviso('Error en ' + campos[i][0], 'El código deber ser un número entero', 0)
                return;
            }
        }

        if(atr.length > campos[i][2]){ //Comprueba la longitud maximo del campo
            aviso('Error en Campo ' + campos[i][0], 'La longitud de dato máxima es ' + campos[i][2], 0)
            return;
        }
    }

    if(f.getAttribute("action") != "/" + ent + "/add"){
        f.submit()
        return;
    }
    console.log("verificando")
    console.log("Id ingresado: " + id)
    if(ids.has(id)){
        //window.alert("Duplicado")
        /*Swal.fire({
            title: 'Código Duplicado',
            text: 'Ya existe un elemento con el mismo código',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            timer: 3000
          }); */
        aviso('Código Duplicado', 'Ya existe un elemento con el mismo código', 0)
    }else{
        /*
        Swal.fire({
            title: 'Elemento registrado',
            text: 'El elemento se registro exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000
          })*/
        aviso('Elemento registrado', 'El elemento se registro exitosamente', 1).then(() => {
            f.submit()
        });
    }
}

function llenar(val){
    for (let i = 0; i < num; i++) {
        document.getElementById("mod" + i).value= document.getElementById("c" + i + "-" + val).textContent
    }
    document.getElementById("estMod").value= est= document.getElementById("est-" + val).textContent

    document.getElementById("codMod").removeAttribute("style")
    document.getElementById("nomMod").removeAttribute("style")
    document.getElementById("titMod").innerHTML= ("Editando " + val)
    const cod= document.getElementById("cod" + val).textContent
    document.getElementById("codMod").value= cod
    document.getElementById("codMod").setAttribute("readonly", "true")
    const nom= document.getElementById("nom" + val).textContent
    document.getElementById("nomMod").value= nom    
    document.getElementById("nomMod").removeAttribute("readonly")
    changeColor()
    document.getElementById("modify").setAttribute("class", "btn btn-success")

    document.getElementById("formMod").setAttribute("action", "/" + ent +"/edit/" +val)

    document.getElementById("modify").removeAttribute("disabled")
    document.getElementById("remove").removeAttribute("disabled")
    document.getElementById("inactivate").removeAttribute("disabled")
    document.getElementById("reactivate").removeAttribute("disabled")
}

function aviso(titulo, descr, tipo){
    if(tipo == 1){
        tipo= 'success'
    }else{
        tipo= 'warning'
    }

    return Swal.fire({
        title: titulo,
        text: descr,
        icon: tipo,
        confirmButtonText: 'Aceptar',
        timer: 3000
    });
}