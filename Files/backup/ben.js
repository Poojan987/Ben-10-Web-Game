


function uniCharCode(event) {
    var char = event.which || event.keyCode;


    if(char==120){
      // ===========================CHAR IS X======================================
      DiamondHeadAttack();
    }
    else if(char==122){
      // ===========================CHAR IS Y======================================
      transformBen();
    }

  }
  function transformBen(){
     var spriteBen=document.getElementById("BEN");
     var container=spriteBen.parentNode;
     var containerWidth=getComputedStyle(container,null).getPropertyValue("width");
     var containerHeight=getComputedStyle(container,null).getPropertyValue("height");
     var pixelSize= getComputedStyle(document.documentElement).getPropertyValue('--pixel-size');
     container.style.width=(pixelSize*15)+"px";
     container.style.height=(pixelSize*29)+"px";
     spriteBen.classList.remove("benWalk");
     spriteBen.classList.add("benTransform");

    //  var DH=document.getElementById("diamondHead");

     window.setTimeout(()=>{
      container.classList.remove("spriteDiv");
      container.removeChild(spriteBen);

      var DH=document.createElement("img");
      var DH_id=document.createAttribute("id");
      container.classList.add("div");  
      container.appendChild(DH);
      DH_id.value="diamondHead";
      DH.setAttributeNode(DH_id);
    },2000);
     
}
  function DiamondHeadAttack(){
    var spriteBG=document.getElementsByClassName("div")[0];
    
    //gCS property's 1st para should be an element
    var widthTemp=window.getComputedStyle(spriteBG,null).getPropertyValue("width"); 
   
   var attackSize= getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')*40;
   

   spriteBG.style.width=attackSize+"px";

   var sprite=document.getElementById("diamondHead");
    
    
    sprite.classList.remove("walk");
    sprite.classList.add("attack");

    
    
    window.setTimeout(()=>{
      sprite.classList.remove("attack");
      sprite.classList.add("walk");  
      spriteBG.style.width=widthTemp;
    },1000);
    window.setTimeout(diamonds,1000);
}
function diamonds(){
  var parent=document.getElementById("road");
  var diamondsDiv=document.createElement("div");
  parent.appendChild(diamondsDiv);
  var diamonds=document.createElement("img");
  diamondsDiv.appendChild(diamonds);
  diamonds.src="diamonds.png";
  var diamondsId=document.createAttribute("id");
  diamondsId.value="diamonds";
  diamonds.setAttributeNode(diamondsId);
  
}