/*Graficador de Conjunto de Mandelbrot con Zoom*/


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


    var C1 = {r:8, g:16, b:32};                                     //Color mas alejado del conjunto de mandelbrot (preferentemente oscuro)
    var C2 = {r:255, g:127, b:0}; 
    var C3 = {r:255, g:255, b:0};
    var C4 = {r:255, g:255, b:127};
    var C5 = {r:255, g:255, b:255};
    
    var vector = [];
    var gradiente = [];

    colores();
  


function fractal () {
    
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
       
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;

    

    for (var x = 0; x <= ancho; x++) {
        for (var y = 0; y <= alto; y++) {
                      
                                                       
            x1000 = ( (x/ancho) * (Aix) ) + iix ;
            y1000 = ( (y/alto) * (-Aiy) ) + iiy ;
          
         
            var c = {r: x1000, i: y1000};
               

            var c2 = {r:0, i:0};
            var c2cuad = {r:0, i:0};
            var it = 0;
                           
            for (var i=0; i<1024; i++) {

                c2cuad.r = (c2.r ** 2) - (c2.i ** 2); 
                c2cuad.i = 2 * c2.r * c2.i;

                c2.r = c2cuad.r + c.r;
                c2.i =  c2cuad.i + c.i;

                var modulo = Math.sqrt ( (c2.r ** 2) + (c2.i ** 2) );
                if (modulo < 2) {
                    it = i;
                } else break;                              /*Si el modulo del complejo resultante es mayor a 2 es porque la formula se va a*/
                                                           /* ecapar al infinito entonces salimos del for para no seguir iterando y graficar*/
            }                                              /* mas rapido */ 
           
            if (modulo < 2) {
             
                contexto.fillStyle = "rgb(10,10,10)";
                contexto.fillRect(x,y,1,1);

            } else {                      
                contexto.fillStyle = `rgb(${gradiente[it].r},${gradiente[it].g},${gradiente[it].b})`;   /*Jugamos con los colores: it es el numero de iteraciones que se usaron*/
                contexto.fillRect(x,y,1,1);                                                              /* para que el complejo actual escape la formula al infinito*/        
                     
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


    document.getElementById("h2i").innerHTML = `a: ${x1000.toFixed(3)} , bi: ${y1000.toFixed(3)}`;  


    
    if (cont==1) {
           
        var div = document.getElementById("divZ");
                       
        div.style.width = `${-(xOrigin-event.pageX)}px`;         
        div.style.height = div.offsetWidth/2 + "px";
    }    


}       




function coordI () {
    
        if (cont == 1) {
            coordF();
            return;
        }

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



function colores () {
     
    for (i=0; i<=1024; i++) {
        gradiente[i] = {r:0, g:0, b:0};
    }
     
 
    genVector (C1.r, C2.r);
        for (i=0; i<=255; i++) {
            gradiente[i].r = vector[i];
        }
              
    genVector (C2.r, C3.r);
        for (i=256; i<=511; i++) {
            gradiente[i].r = vector[i-256];
        }

    genVector (C3.r, C4.r);
        for (i=512; i<=767; i++) {
            gradiente[i].r = vector[i-512];
        }
            
    genVector (C4.r, C5.r);
        for (i=768; i<=1024; i++) {
            gradiente[i].r = vector[i-768];
        }    



    genVector (C1.g, C2.g);
        for (i=0; i<=255; i++) {
            gradiente[i].g = vector[i];
        }
        
    genVector (C2.g, C3.g);
        for (i=256; i<=511; i++) {
            gradiente[i].g = vector[i-256];
        }

    genVector (C3.g, C4.g);
        for (i=512; i<=767; i++) {
            gradiente[i].g = vector[i-512];
        }    

    genVector (C4.g, C5.g);
        for (i=768; i<=1024; i++) {
            gradiente[i].g = vector[i-768];
        }     



    genVector (C1.b, C2.b);
        for (i=0; i<=255; i++) {
            gradiente[i].b = vector[i];
        }
    
    genVector (C2.b, C3.b);
        for (i=256; i<=511; i++) {
            gradiente[i].b = vector[i-256];
        }

    genVector (C3.b, C4.b);
        for (i=512; i<=767; i++) {
            gradiente[i].b = vector[i-512];
        }     
         
    genVector (C4.b, C5.b);
        for (i=768; i<=1024; i++) {
            gradiente[i].b = vector[i-768];
        }      

        

    function genVector (vi, vf) {
        var pasos = (vf - vi) / 255;
        vector[0] = vi;

        for (i=1; i<=255; i++) {

            vector[i] = vi;
            vector[i] += pasos;
            vi += pasos;
        }
    }
}

   