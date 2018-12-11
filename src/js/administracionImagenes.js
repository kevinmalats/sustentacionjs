var arrayAvaters=JSON.parse(localStorage.getItem("imagenes"));

var guardar= document.getElementById("btnGuardar");
guardar.addEventListener("click", guardarUsuario);

var nuevo= document.getElementById("btnNuevo");
nuevo.addEventListener("click", nuevoUsuario);
listarUsuario();

function listarUsuario(){
  var div=document.getElementById("listar");
div.innerHTML="";
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var filaTitulo= document.createElement("tr");
  var tdId= document.createElement("td");
  tdId.innerHTML="Id";
  var tdNombre= document.createElement("td");
  tdNombre.innerHTML="Nombre";


  filaTitulo.appendChild(tdId);
  filaTitulo.appendChild(tdNombre);


  tblBody.appendChild(filaTitulo);
  for (var variable in arrayAvaters) {
    var hilera= document.createElement("tr");
    var celdaId= document.createElement("td");
    celdaId.innerHTML=arrayAvaters[variable].id;
    var celdaNombre= document.createElement("td");
    var imgNombre= document.createElement("img");
    if(arrayAvaters[variable].nombre.substring(0,4)=="data"){
      imgNombre.src=arrayAvaters[variable].nombre;

    }else
    imgNombre.src="../img/"+arrayAvaters[variable].nombre;
    imgNombre.className="personalImg";
    celdaNombre.appendChild(imgNombre);



   var celdaEditar= document.createElement("td");
     var editar=document.createElement("a");
     editar.textContent="Editar";
      editar.href="#";
      editar.setAttribute("onclick","editar("+arrayAvaters[variable].id+")");
  celdaEditar.appendChild(editar);

  var celdaEliminar=document.createElement("td");
  var eliminar= document.createElement("a");
  eliminar.setAttribute("onclick","eliminar("+arrayAvaters[variable].id+")");
   eliminar.textContent="Eliminar";
   eliminar.href="#";
  celdaEliminar.appendChild(eliminar);

    hilera.appendChild(celdaId);
    hilera.appendChild(celdaNombre);

    hilera.appendChild(celdaEditar);
    hilera.appendChild(celdaEliminar);
    tblBody.appendChild(hilera);
  }

  tabla.appendChild(tblBody);
  div.appendChild(tabla);
}

function nuevoUsuario(){
  let div=document.getElementById("nuevo");
  div.style.display="block";
}

function guardarUsuario(){

  let foto = $("#imagenadd").attr("src");
  var id=arrayAvaters.length+1;
 var obj= new Imagenes();


 obj.nombre=foto;
 obj.id=id;
 arrayAvaters.push(obj);
localStorage.setItem("imagenes",JSON.stringify(arrayAvaters));
let div=document.getElementById("nuevo");
div.style.display="none";
listarUsuario();
}


function eliminar(id){
let indice=0;
  for (var variable in arrayAvaters) {

    if (arrayAvaters[variable].id==id) {
      arrayAvaters.splice(indice,1);
      break;
    }
   indice++;
  }

  localStorage.setItem("imagenes",JSON.stringify(arrayAvaters));
  listarUsuario();
}
function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log(e.target.result);

            $('#'+id).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$("#imagen").change(function(){
    readURL(this, "imagenadd");
});

$("#imagenedit").change(function(){
    readURL(this, "imagenaddedit");
});
// EDITAR
function editar(id){
  let div=document.getElementById("editar");
  div.style.display="block";

  var foto=document.getElementById("imagenedit");
  var idCampo=document.getElementById("idedit");
let guardar=document.getElementById("btnEditar");

  let indice=0;
    for (var variable in arrayAvaters) {

      if (arrayAvaters[variable].id==id) {
      
      idCampo.textContent=arrayAvaters[variable].id;

        break;
      }
     indice++;
    }


   guardar.setAttribute("onclick","update("+id+")");


}
function update(id){
  var objEditar= new Imagenes();

  let foto = $("#imagenaddedit").attr("src");

  objEditar.nombre=foto;
   objEditar.id=id;
  let indice=0;
    for (var variable in arrayAvaters) {

      if (arrayAvaters[variable].id==id) {
        arrayAvaters.splice(indice,1);
        break;
      }
     indice++;
    }
  arrayAvaters.push(objEditar);
  localStorage.setItem("imagenes",JSON.stringify(arrayAvaters));
  let div=document.getElementById("editar");
  div.style.display="none";
  listarUsuario();
}
