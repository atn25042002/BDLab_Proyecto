export function entero(id, num){
    if(!Number.isInteger(id)){
        Swal.fire({
            title: 'Código Inválido',
            text: 'El código debe ser entero',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            timer: 3000
        });
        return false;
    }
    return true;
}