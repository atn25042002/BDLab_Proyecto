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
    //const nom= document.getElementById("nom" + document.getElementById("codMod").value).textContent
    //document.getElementById("nomMod").value= nom
    document.getElementById("remove").setAttribute("class", "btn btn-danger")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").value= ("*")
}

function inac(){
    changeColor()
    //const nom= document.getElementById("nom" + document.getElementById("codMod").value).textContent
    //document.getElementById("nomMod").value= nom
    document.getElementById("inactivate").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").value= ("I")
}

function reac(){
    changeColor()
    //const nom= document.getElementById("nom" + document.getElementById("codMod").value).textContent
    //document.getElementById("nomMod").value= nom
    document.getElementById("reactivate").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").value= ("A")
}

function nuevo(){
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

function llenar(val){
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
    document.getElementById("formMod").setAttribute("action", "/edit/" + cod)    

    document.getElementById("modify").removeAttribute("disabled")
    document.getElementById("remove").removeAttribute("disabled")
    document.getElementById("inactivate").removeAttribute("disabled")
    document.getElementById("reactivate").removeAttribute("disabled")
}