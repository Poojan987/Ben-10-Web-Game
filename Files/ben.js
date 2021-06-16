
 var spriteBen=document.getElementById("benContainer");
var rightPos=rightMostPos(spriteBen);
function uniCharCode(event) {
    var char = event.which || event.keyCode;
  console.log(char);

    if(char==120){
      // ===========================CHAR IS X======================================
      benClasslist=spriteBen.classList;
      if(!(benClasslist.contains("benWalk") || benClasslist.contains("benTransform")||benClasslist.contains("transform")||benClasslist.contains("attack")))
      DiamondHeadAttack();
      
    }
    else if(char==122){
      // ===========================CHAR IS Y======================================
      transformBen();
      
    }
    else if(char==121){
     var body=document.getElementsByClassName("mainBody")[0];
     var roadLine=document.getElementById("line");
      body.classList.remove("start");
     body.classList.add("paused");
     roadLine.style.animationPlayState="paused";
    }
    else if(char==115){
      var body=document.getElementsByClassName("mainBody")[0];
      var roadLine=document.getElementById("line");
      body.classList.remove("paused");
     body.classList.add("start");
     roadLine.style.animationPlayState="running";
     console.log(body.classList);
    }

  }

  


function rightMostPos(sprite){
  var leftPos=sprite.offsetLeft;
  var rightPos=sprite.offsetWidth+leftPos;

  return rightPos;

}



  

  function transformBen(){
    //  var spriteBen=document.getElementById("BEN");
    

    //  var container=spriteBen.parentNode;
    //  var containerWidth=getComputedStyle(container,null).getPropertyValue("width");
    //  var containerHeight=getComputedStyle(container,null).getPropertyValue("height");
    //  var pixelSize= getComputedStyle(document.documentElement).getPropertyValue('--pixel-sizeb');
    //  container.style.width=(pixelSize*15)+"px";
    //  container.style.height=(pixelSize*29)+"px";
     spriteBen.classList.remove("benWalk");
     spriteBen.classList.add("benTransform");

    //  var DH=document.getElementById("diamondHead");

     window.setTimeout(()=>{
      // container.classList.remove("spriteDiv");
      // container.removeChild(spriteBen);

      // var DH=document.createElement("img");
      // var DH_id=document.createAttribute("id");
      // container.classList.add("div");  
      // container.appendChild(DH);
      // DH_id.value="diamondHead";
      // DH.setAttributeNode(DH_id);
      spriteBen.classList.remove("benTransform");
      spriteBen.classList.add("transform");

    },2000);
    window.setTimeout(()=>{
      spriteBen.classList.remove("transform");
      spriteBen.classList.add("walk");
    },4000);

     rightPos=rightMostPos(spriteBen);
     
}
  function DiamondHeadAttack(){
  //   var spriteBG=document.getElementsByClassName("div")[0];
    
  //   //gCS property's 1st para should be an element
  //   var widthTemp=window.getComputedStyle(spriteBG,null).getPropertyValue("width"); 
   
  //  var attackSize= getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')*40;
   

  //  spriteBG.style.width=attackSize+"px";

  //  var sprite=document.getElementById("diamondHead");
    
    
    // sprite.classList.remove("walk");
    // sprite.classList.add("attack");

    spriteBen.classList.remove("walk");
    spriteBen.classList.add("attack");

    
    
    window.setTimeout(()=>{
      spriteBen.classList.remove("attack");
      spriteBen.classList.add("walk");  
      // spriteBG.style.width=widthTemp;
    },1000);
    window.setTimeout(diamonds,1000);

    rightPos=rightMostPos(spriteBen);
}
function diamonds(){
  var parent=document.getElementById("road");
  // var diamondsDiv=document.createElement("div");
  // parent.appendChild(diamondsDiv);
  var diamonds=document.createElement("img");
  // diamondsDiv.appendChild(diamonds);
  parent.appendChild(diamonds);
  diamonds.src="diamonds.png";
  var diamondsClass=document.createAttribute("class");
  diamondsClass.value="diamonds";
  diamonds.setAttributeNode(diamondsClass);
  
}
var spawnHybrid=window.setInterval(start,5000);

// GET WINDOW RELATIVE OFFSET

function start(){
  var hybrid =document.getElementById("hybrid");
  var coordsHybrid=hybrid.getBoundingClientRect();
  var coordsBen=spriteBen.getBoundingClientRect();
  var road=document.getElementById("road");
  var coordsRoad=road.getBoundingClientRect();


  // console.log(road.childNodes);

  hybrid.classList.add("hybridWalk");
  
 var setInterval1= window.setInterval(()=>{
  coordsHybrid=hybrid.getBoundingClientRect();
    // console.log(hybrid.offsetLeft);
    // console.log(coords);
    var d=document.getElementsByClassName("diamonds");
     if(coordsHybrid.left>0&&coordsHybrid.left<=coordsBen.right){
      
      hybrid.classList.remove("hybridWalk");
      hybrid.classList.add("hybridAttack");

      // var hybridAttackId=document.createAttribute("id");
      // hybridAttackId.value="hybridAttack";

      hybrid.style.left=coordsBen.left+"px";
      // hybrid.style.top=(coordsHybrid.bottom)+"px";

  

  // coordsHybrid.left

      window.clearInterval(setInterval1);
      window.clearInterval(spawnHybrid);
    }
    else if( d[0]!==undefined){
      var coordsD=d[0].getBoundingClientRect();
      // console.log(coordsD.left);
      if(coordsD.left>coordsRoad.right){
        road.removeChild(d[0]); 
        // d.style.visibility="none";
      }
      else if( coordsD.right-70>=coordsHybrid.left){
        hybrid.classList.remove("hybridWalk");
        road.removeChild(d[0]); 
        window.clearInterval(setInterval1);
      }


    }
    
  }
  ,15);
 
  
}


