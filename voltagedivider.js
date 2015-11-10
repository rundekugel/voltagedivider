//$Id:$
//by gaul1-lifesim.de

function rtGetVer(){
  return 0.1;
}

function rtPot(val){
  z=1;
  while(val >=10){
    val /=10;
    z /=10;
  }
  return z;
}

function getId(id){
  return document.getElementById(id);
}

function rtPotN(val){
  z=1;
  while(val <1){
    val *=10;
    z *=10;
  }
  return z;
}

function rtGetE12(u1,u2){
  e12 = new Array ( 1.0 ,1.2 ,1.5,1.8 ,2.2 ,2.7,3.3 ,3.9 ,4.7,5.6 ,6.8 , 8.2);
  return rtGetEN(u1,u2,e12);
}

function rtGetE24(u1,u2){
  e24 = new Array ( 1.0 ,1.1 ,1.2,1.3 ,1.5 ,1.6,1.8 ,2.0 ,2.2,2.4 ,2.7 ,3.0,3.3 ,3.6 ,3.9,4.3 ,4.7 ,5.1,5.6 ,6.2 ,6.8,7.5 ,8.2 ,9.1);
  return rtGetEN(u1,u2,e24);
}

function rtGetE48(u1,u2){
  e48 = new Array ( 1.00 ,1.05 ,1.10,1.15 ,1.21 ,1.27,1.33 ,1.40 ,1.47,1.54 ,1.62 ,1.69,1.78 ,1.87 ,1.96,2.05 ,2.15 ,2.26,2.37 ,2.49 ,2.61,2.74 ,2.87 ,3.01,3.16 ,3.32 ,3.48,3.65 ,3.83 ,4.02,4.22 ,4.42 ,4.64,4.87 ,5.11 ,5.36,5.62 ,5.90 ,6.19,6.49 ,6.81 ,7.15,7.50 ,7.87 ,8.25,8.66 ,9.09 ,9.53 );
  return rtGetEN(u1,u2,e24);
}

function rtGetE96(u1,u2){
  e24 = new Array ( 1.00 ,1.02 ,1.05,1.07 ,1.10 ,1.13,1.15 ,1.18 ,1.21,1.24 ,1.27 ,1.30,1.33 ,1.37 ,1.40,1.43 ,1.47 ,1.50,1.54 ,1,58 ,1.62,1.65 ,1.69 ,1.74,1.78 ,1.82 ,1.87,1.91 ,1.96 ,2.00,2.05 ,2.10 ,2.16,2.21 ,2.26 ,2.32,2.37 ,2.43 ,2.49,2.55 ,2.61 ,2.67,2.74 ,2.80 ,2.87,2.94 ,3.01 ,3.09,3.16 ,3.24 ,3.32,3.40 ,3.48 ,3.57,3.65 ,3.74 ,3.83,3.92 ,4.02 ,4.12,4.22 ,4.32 ,4.42,4.53 ,4.64 ,4.75,4.87 ,4.99 ,5.11,5.23 ,5.36 ,5.49,5.62 ,5.76 ,5.90,6.04 ,6.19 ,6.34,6.49 ,6.65 ,6,81,6.98 ,7.15 ,7.32,7.50 ,7.68 ,7.87,8.06 ,8.25 ,8.45,8.66 ,8.87 ,9.09,9.31 ,9.53 ,9.76 );
  return rtGetEN(u1,u2,e24);
}

function calcFehlerP(soll, ist){
  d = soll - ist;
  f = d/soll;
  f= f * 100;
  return f;
}  

function rtGetEN(u1,u2, en){
  //evaluate best fitting resistors
  if(u2 == 0) return "Error: U2=0!";
  if(u1 == 0) return "U1=0, are you kidding?"
  
  u1 = Math.abs(u1);
  u2 = Math.abs(u2);
  //if(u1 <0 || u2 <0) return "Error: no negative values allowed, yet!";
  
  result = "";
  z = 1;
  v=u1/u2;
  
  if( v>1){
    z =rtPot(v);
    v *= z;
  }
  if( v<1){
    z =rtPotN(v);
    v *= z;
  }

  mindelta = 100;
  r1 = 0;
  r2 = 0;
  lastdiv=0;
  div = 0;
  delta = 0;
    
  //result += v +"<br>"
  
  for (i1=0; i1 < en.length; i1 += 1){
    for (i2=0; i2 < en.length; i2 += 1){
      div = en[i1]/en[i2];
      delta = div-v;
      //if(delta < 0) { delta = -delta;}
      delta = Math.abs(delta);
      if(delta < mindelta){
        lastdiv = div;
        mindelta = delta;
        r1= en[i1]; r2= en[i2];
      }
    }
  }

  err= calcFehlerP(v, lastdiv).toFixed(2);
  v /=z;

  if(z<1){
    r1 /= z;
    r1= Math.round(r1*100)/100;
  }else{
    r2 *= z;
    r2= Math.round(r2*100)/100;
  }
  
  div2 = r1/r2;
  mindelta = v-div2;
  mindelta= mindelta.toFixed(3);
  div2 = div2.toFixed(3);
  result += "r1/r2 = "+ r1 +"/"+ r2 +" = "+ div2 +
    " &nbsp;&nbsp;&nbsp;&nbsp; (d="+ mindelta +" = "+ err +"%)";
  
  return result;
}


//eof
