var arrayAvaters=JSON.parse(localStorage.getItem("avatares"));

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
  tdNombre.innerHTML="Foto";
  var tdPunto= document.createElement("td");
  tdPunto.innerHTML="Puntos";
  var tdGenero= document.createElement("td");
  tdGenero.innerHTML="Genero";

  filaTitulo.appendChild(tdId);
  filaTitulo.appendChild(tdNombre);
  filaTitulo.appendChild(tdPunto);
  filaTitulo.appendChild(tdGenero);

  tblBody.appendChild(filaTitulo);
  for (var variable in arrayAvaters) {
    var hilera= document.createElement("tr");
    var celdaId= document.createElement("td");
    celdaId.innerHTML=arrayAvaters[variable].id;
    var celdaNombre= document.createElement("td");
    let imgFoto= document.createElement("img");
    if(arrayAvaters[variable].nombre.substring(0,4)=="data"){
      imgFoto.src=arrayAvaters[variable].nombre;
      imgFoto.className="rounded-circle personalImg";
    }else
    imgFoto.src="../img/"+arrayAvaters[variable].nombre;
    celdaNombre.appendChild(imgFoto);

    var celdaPunto= document.createElement("td");
    celdaPunto.innerHTML=arrayAvaters[variable].puntos;
    var celdaGenero= document.createElement("td");
    celdaGenero.innerHTML=arrayAvaters[variable].genero;



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
    hilera.appendChild(celdaPunto);
    hilera.appendChild(celdaGenero);
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
  var punto=document.getElementById("punto");
  var genero=document.getElementById("genero");
  //var foto=document.getElementById("foto");
  let foto = $("#fotoadd").attr("src");
  var id=arrayAvaters.length+1;
 var obj= new Avatar();
 var pts=parseInt(punto.value,10);
 obj.puntos=pts;
 obj.genero=genero.value;
 obj.nombre=foto;
 obj.id=id;
 arrayAvaters.push(obj);
localStorage.setItem("avatares",JSON.stringify(arrayAvaters));
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

  localStorage.setItem("avatares",JSON.stringify(arrayAvaters));
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
$("#foto").change(function(){
    readURL(this, "fotoadd");
});

$("#fotoedit").change(function(){
    readURL(this, "fotoaddedit");
});
// EDITAR
function editar(id){
  let div=document.getElementById("editar");
  div.style.display="block";
  var punto=document.getElementById("puntoedit");
  var genero=document.getElementById("generoedit");
  var foto=document.getElementById("fotoaddedit");
  var idCampo=document.getElementById("idedit");
let guardar=document.getElementById("btnEditar");

  let indice=0;
    for (var variable in arrayAvaters) {

      if (arrayAvaters[variable].id==id) {
      punto.value=arrayAvaters[variable].puntos;
      idCampo.textContent=arrayAvaters[variable].id;
    if(arrayAvaters[variable].nombre!="") { 
    if(arrayAvaters[variable].nombre.substring(0,4)=="data"){
    foto.src= arrayAvaters[variable].nombre;
    }else
        foto.src= "../img/"+arrayAvaters[variable].nombre;
    }
     let optiongenereo=document.createElement("option");
     optiongenereo.selected="true";
     optiongenereo.value=arrayAvaters[variable].genero;
     optiongenereo.textContent=arrayAvaters[variable].genero;
     genero.appendChild(optiongenereo);

        break;
      }
     indice++;
    }


   guardar.setAttribute("onclick","update("+id+")");


}


function update(id){
  let objEditar= new Avatar();
  let punto=document.getElementById("puntoedit");
  let genero=document.getElementById("generoedit");

    let foto = $("#fotoaddedit").attr("src");
    let pts=parseInt(punto.value,10);
  objEditar.puntos=pts;
  objEditar.genero=genero.value;
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
  localStorage.setItem("avatares",JSON.stringify(arrayAvaters));
  let div=document.getElementById("editar");
  div.style.display="none";
  listarUsuario();
}
