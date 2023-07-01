function changeColor(val){
    document.getElementById("modify"+val).setAttribute("class", "btn btn-primary")
    document.getElementById("remove"+val).setAttribute("class", "btn btn-primary")
    document.getElementById("inactivate"+val).setAttribute("class", "btn btn-primary")
    document.getElementById("reactivate"+val).setAttribute("class", "btn btn-primary")
}

function mod(val){
    changeColor(val)
    document.getElementById("modify"+val).setAttribute("class", "btn btn-success")
    document.getElementById("nom"+val).removeAttribute("readonly")
    document.getElementById("est"+val).setAttribute("value", "A")
}

function del(val){
    changeColor(val)
    document.getElementById("remove"+val).setAttribute("class", "btn btn-danger")
    document.getElementById("nom"+val).setAttribute("readonly", "true")
    document.getElementById("est"+val).setAttribute("value", "*")
}

function inac(val){
    changeColor(val)
    document.getElementById("inactivate"+val).setAttribute("class", "btn btn-success")
    document.getElementById("nom"+val).setAttribute("readonly", "true")
    document.getElementById("est"+val).setAttribute("value", "I")
}

function reac(val){
    changeColor(val)
    document.getElementById("reactivate"+val).setAttribute("class", "btn btn-success")
    document.getElementById("nom"+val).setAttribute("readonly", "true")
    document.getElementById("est"+val).setAttribute("value", "A")
}