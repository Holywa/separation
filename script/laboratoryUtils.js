function createForm(){ // window.prompt: fenetre extérieure


	var mainTag=document.getElementsByTagName("body")[0];
			
	var textareaTag=document.createElement("textarea");
	var attTaId=document.createAttribute("id");
	attTaId.value="texte";
	mainTag.appendChild(textareaTag);
	textareaTag.setAttributeNode(attTaId);
	
	var inputTag=document.createElement("input");
	
	var attInputType=document.createAttribute("type");
	attInputType.value="submit";
	
	var attInputValue=document.createAttribute("value");
	attInputValue.value="clic!";
	
	var attInputOnclick=document.createAttribute("onclick");
	attInputOnclick.value="javascript:alert(document.getElementById('texte').value);";
	
	mainTag.appendChild(inputTag);
	inputTag.setAttributeNode(attInputType);
	inputTag.setAttributeNode(attInputValue);
	inputTag.setAttributeNode(attInputOnclick);
	userWord= document.getElementById('texte').value;

	
/*
<FORM name="mon_formulaire">
	<INPUT type=text  value="" name="mon_champ_texte"><INPUT type=button value="Saisir" onClick="PromptMessage()">
</FORM>
<SCRIPT language=javascript>
   function PromptMessage() {
       var saisie = prompt("Saisissez votre texte :", "Texte par défaut")
       if (saisie!=null) {
           document.forms["mon_formulaire"].elements["mon_champ_texte"].value=saisie;
       }
   }
</SCRIPT>
*/
} 
 
 
 
 
 
function loadXMLDoc(dname){

    if (window.XMLHttpRequest){
        xhttp=new XMLHttpRequest();
    }
    else{
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
}


function getXMLHttpRequest() {
    var xhr = null;
     
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    
    return xhr;
}



function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}





function checkDeviceLabo() {
	readjustSizes();
	//Need to force style in block to not resize the div content of stage
	//stage.getContent().style.display = 'block';
	initLaboMenu();
	//getGesture();
}