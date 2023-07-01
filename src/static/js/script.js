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
    document.getElementById("estMod").setAttribute("value", "A")
}

function del(){
    changeColor()
    document.getElementById("remove").setAttribute("class", "btn btn-danger")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").setAttribute("value", "*")
}

function inac(){
    changeColor()
    document.getElementById("inactivate").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").setAttribute("value", "I")
}

function reac(){
    changeColor()
    document.getElementById("reactivate").setAttribute("class", "btn btn-success")
    document.getElementById("nomMod").setAttribute("readonly", "true")
    document.getElementById("estMod").setAttribute("value", "A")
}

function nuevo(){
    document.getElementById("titMod").setAttribute("value", "Agregando nuevo producto")
    document.getElementById("codMod").setAttribute("value", "")
    document.getElementById("nomMod").setAttribute("value", "")
    document.getElementById("estMod").setAttribute("value", "")

    document.getElementById("formMod").setAttribute("action", "/section/")
}

function llenar(val){
    document.getElementById("titMod").innerHTML= ("Editando " + val)
    const cod= document.getElementById("cod" + val).innerHTML
    document.getElementById("codMod").setAttribute("value", cod)
    const nom= document.getElementById("nom" + val).innerHTML
    document.getElementById("nomMod").setAttribute("value", nom)
    const est= document.getElementById("est" + val).innerHTML
    document.getElementById("estMod").setAttribute("value", est)

    document.getElementById("formMod").setAttribute("action", "/edit/" + cod)
    ///edit/{{d.SecCod}}
    //value="{{d.SecEstReg.copy().pop()}}" 
}