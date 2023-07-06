var ids= new Set();

window.onload= function agregar(id){
    let elementos = document.querySelectorAll(".cods");    
    elementos.forEach(function(elemento) {
        ids.add(elemento.id)
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

    document.getElementById("titMod").innerHTML= ("Agregando nuevo producto")
    document.getElementById("codMod").value = ""
    document.getElementById("codMod").removeAttribute("readonly")
    document.getElementById("nomMod").value = ""
    document.getElementById("nomMod").removeAttribute("readonly")
    document.getElementById("estMod").value = "A"

    document.getElementById("formMod").setAttribute("action", "/section")
}

function verificar(){
    const id= document.getElementById("codMod").value
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


    if(f.getAttribute("action") != "/section/add"){
        f.submit()
        return;
    }
    console.log("verificando")
    console.log("Id ingresado: " + id)
    if(ids.has("cod" + id)){
        //window.alert("Duplicado")
        Swal.fire({
            title: 'Código Duplicado',
            text: 'Ya existe un elemento con el mismo código',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            timer: 3000
          });
    }else{
        Swal.fire({
            title: 'Elemento registrado',
            text: 'El elemento se registro exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000
          }).then(() => {
            f.submit()
          });        
    }
}

function llenar(val){
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
    const est= document.getElementById("est" + val).textContent
    document.getElementById("estMod").value= est
    document.getElementById("formMod").setAttribute("action", "/section/edit/" +val)

    document.getElementById("modify").removeAttribute("disabled")
    document.getElementById("remove").removeAttribute("disabled")
    document.getElementById("inactivate").removeAttribute("disabled")
    document.getElementById("reactivate").removeAttribute("disabled")
}