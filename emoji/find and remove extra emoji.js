var result = {success: false};

source = crowdin.source.replace(/(?:\r\n|\r)/g, '\n');
translation = crowdin.translation.replace(/(?:\r\n|\r)/g, '\n');

//emoji patern
patern =/(:\w+:)|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

sourceMatch = source.match(patern);
translationMatch = translation.match(patern);

if(sourceMatch==null) sourceMatch=[];
if(translationMatch==null) translationMatch=[];
  
if (sourceMatch==null&&translationMatch==null){
	result.success = true;
} else {	
	translationDiff = translationMatch.slice(0);
    sourceDiff = sourceMatch.slice(0); 
  
    //1 Duplicate
    //create new function
  	for (var i=0; i<sourceMatch.length;i++){  //*.length
      if (translationDiff.indexOf(sourceMatch[i])!=-1){
      	translationDiff.splice(translationDiff.indexOf(sourceMatch[i]),1)
      }
    }
  
  	//2 Duplicate
    //create new function
    for (var i=0; i<translationMatch.length;i++){
      if (sourceDiff.indexOf(translationMatch[i])!=-1){
      	sourceDiff.splice(sourceDiff.indexOf(translationMatch[i]),1)
      }
    }
  	
  	//body
  	if(sourceDiff==0&&translationDiff==0){
    result.success = true;
    } else {
 		correct=translation;
      if (sourceDiff.length>0) {correct+=" ("+sourceDiff+")";}
      	for (var i=0; i<translationDiff.length;i++){
        	correct = correct.replace(translationDiff[i],"");
        }
      	
      if (sourceDiff.length>0&&translationDiff.length>0) result.message = "different emoji in lines";
      if (sourceDiff.length>0&&translationDiff.length==0) result.message = "u forget "+(sourceDiff.length-translationDiff.length)+" emoji(s)";
      if (sourceDiff.length==0&&translationDiff.length>0) result.message = "you filed more ("+(translationDiff.length-sourceDiff.length)+") emojis than source";
      
      result.fixes = [
      		{
        		from_pos: 0,
            	to_pos:  -1,
            	replacement: correct
        	}
        ];
        
    }

}

return result;