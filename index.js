
 Aix = 5;        
 Aiy = (Aix / 2);  
 iix = -2.5;     
 iiy = 1.25;     

 var xi = 0;
 var yi = 0;
 var xf = 0;
 var yf = 0;


 var xOrigin = 0;
 var yOrigin = 0;
 var xFinal = 0;
 var yFinal = 0;
 var cont = 0;


 var ancho = window.innerWidth;                                     /*Ancho del viewport*/
 var alto = window.innerHeight;                                     /*Alto del viewport*/    


function fractal () {
    
    document.getElementById("canvas").style.width = `${window.innerWidth}px`;
    document.getElementById("canvas").style.height = `${window.innerHeight}px`;

    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
       
    canvas.width = canvas.getBoundingClientRect().width;                /*Estas dos lineas son para que los pixeles dibujados no se vean borrosos*/
    canvas.height = canvas.getBoundingClientRect().height;

       

    for (var x = 0; x <= window.innerWidth; x++) {
        for (var y = 0; y <= window.innerHeight; y++) {
                      
                                                       
            x1000 = (  (x/ancho) *  (Aix) )  + iix ;
            y1000 = (  (y/alto) *   (-Aiy) )  + iiy ;
          
         
            var c = math.complex (x1000,y1000);
            

            var c2 = 0;

            
                           /*127*/
            for (var i=0; i<127; i++) {
                c2 = math.add ( math.pow(c2,2) ,c);

                var modulo = Math.sqrt ( (c2.re * c2.re)+(c2.im * c2.im) );
                if (modulo < 2) {
                    var it = i;
                } else break;                              /*Si el modulo del complejo resultante es mayor a 2 es porque la formula se va a*/
                                                           /* ecapar al infinito entonces salimos del for para no seguir iterando y graficar*/
            }                                              /* mas rapido */ 

            

            if (modulo < 2) {
             
                contexto.fillStyle = "rgb(0,0,0)";
                contexto.fillRect(x,y,1,1);

            } else {                       /*  5       2       10*/
                 
                contexto.fillStyle = `rgb(${it*8},${it*4},${it*20})`;   /*Jugamos con los colores: it es el numero de iteraciones que se usaron*/
                contexto.fillRect(x,y,1,1);                             /* para que el complejo actual escape la formula al infinito*/        
                      
            }



        }
    
    
    }
 
    
}



function coordenadas () {

    var x = event.pageX;
    var y = event.pageY;

    document.getElementById("h2").innerHTML = `x: ${x} , y: ${y}`;  
  
    
    x1000 = (  (event.pageX/ancho) *  (Aix) )  + iix ;

    y1000 = (  (event.pageY/alto) *   (-Aiy) )  + iiy ;


    document.getElementById("h2i").innerHTML = `xi: ${x1000.toFixed(3)} , yi: ${y1000.toFixed(3)}`;  


    
    if (cont==1) {
           
        var div = document.getElementById("divZ");
                       
        div.style.width = `${-(xOrigin-event.pageX)}px`;         
        div.style.height = div.offsetWidth/2 + "px";
    }    


}       




function coordI () {
    
    xi = (  (event.pageX/ancho) *  (Aix) )  + iix ;
    yi = (  (event.pageY/alto) *   (-Aiy) )  + iiy ;


    xOrigin = event.pageX;
    yOrigin = event.pageY;
    cont = 1;
    
    var div = document.getElementById("divZ");

    div.style.display = "block";
    
    div.style.position = "absolute";
    div.style.border = "1px solid red"; 
    div.style.left = `${event.pageX}px`;            
    div.style.top = `${event.pageY}px`; 


}


function coordF () {
   
    xf = (  (event.pageX/ancho) *  (Aix) )  + iix ;
    yf = (  (event.pageY/alto) *   (-Aiy) )  + iiy ;

    var div = document.getElementById("divZ");
    Aix = div.offsetWidth  *  (Aix / ancho);
    Aiy = div.offsetHeight  *  (Aiy/ alto);
        
    iix = xi;
    iiy = yi;
        


    cont = 0;
    var div = document.getElementById("divZ");
    div.style.width = 0;
    div.style.height = 0;
    div.style.display = "none";    



    fractal ();

}