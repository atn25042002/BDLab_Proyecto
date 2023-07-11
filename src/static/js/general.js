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
    for (let i = 0; i < num; i++) {
        document.getElementById("mod" + i).value= ""
        document.getElementById("mod" + i).removeAttribute("style")
        document.getElementById("mod" + i).removeAttribute("readonly")
    }

    document.getElementById("modify").setAttribute("disabled", "true")
    document.getElementById("remove").setAttribute("disabled", "true")
    document.getElementById("inactivate").setAttribute("disabled", "true")
    document.getElementById("reactivate").setAttribute("disabled", "true")

    document.getElementById("titMod").textContent= ("Agregando " + ent)   
    document.getElementById("mod" + num).value = "A"

    document.getElementById("formMod").setAttribute("action", "/tabla/" + ent + "/add")
}

function verificar(campos){
    console.log(campos)
    let datos= [];
    let valor;
    for (let i = 0; i <= num; i++) {
        valor= document.getElementById("mod" + i).value
        if(valor == ""){
            document.getElementById("mod" + i).setAttribute("style","box-shadow: 0px 0px 1px 2px rgba(200, 0, 0, 0.5);")
            return;
        }else{
            document.getElementById("mod" + i).removeAttribute("style")
        }
        datos.push(valor)
    }
    console.log(datos)

    for (let i = 0; i < datos.length - 1; i++) {
        let atr = datos[i]
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

    f= document.getElementById("formMod")
    if(f.getAttribute("action") != "/tabla" + ent + "/add"){
        f.submit()
        return;
    }

    id= datos[0]
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
    for (let i = 0; i <= num; i++) {
        document.getElementById("mod" + i).value= document.getElementById("c" + i + "-" + val).textContent
        document.getElementById("mod" + i).removeAttribute("style")
        document.getElementById("mod" + i).removeAttribute("readonly")
    }
    document.getElementById("titMod").textContent= ("Editando: " + val + " - " + document.getElementById("c1-"+val).textContent)
    
    document.getElementById("mod0").setAttribute("readonly", "true")

    changeColor()
    document.getElementById("modify").setAttribute("class", "btn btn-success")

    document.getElementById("formMod").setAttribute("action", "/tabla/" + ent +"/edit/" +val)

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