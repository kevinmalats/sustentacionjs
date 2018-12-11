class Juego {
  constructor() {


  }
   getRand(max,min){
    return Math.floor(Math.random() * (max - min));
  }
  getTablero(nivel){

    var imagenese=JSON.parse(localStorage.getItem("imagenes"));
    var imgSeleccionadas=[];
    let cont=0;
    let max=imagenese.length-1;
    while(cont<nivel){
      let random=this.getRand(max,0);


          imgSeleccionadas.push(imagenese[random]);
          imgSeleccionadas.push(imagenese[random]);
          imagenese.splice(random, 1);
           max--;
      cont++;
    }
    return imgSeleccionadas;
  }
  ubicarElementos(array){
let random=0;
var posicionArray=[];
var tope=array.length;
let cont=0;
while(cont<tope){
var tamaño=array.length-1;
random=this.getRand(tamaño,0);


        posicionArray.push(array[random]);
        array.splice(random, 1);

    cont++;
    }
    return posicionArray;
  }
}
