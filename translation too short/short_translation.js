var percentageRatioToSource = 1; //can be from 1 to 100
//if the source/translation length ratio less then the "percentageRatioToSource", a message will be displayed


//ask about check for caps

var result = {
    success: false
};

if (crowdin.contentType == "application/vnd.crowdin.text+plural") {
    var obj = JSON.parse(crowdin.source);
    source = obj[crowdin.context.pluralForm].replace(/(?:\r\n|\r)/g, '\n');
} else {
    source = crowdin.source.replace(/(?:\r\n|\r)/g, '\n');
}
translation = crowdin.translation.replace(/(?:\r\n|\r)/g, '\n');

if(source.length!=0){
    if(translation.length!=0){
        if((translation.length/source.length)*100<percentageRatioToSource){
            result.message = 'The translation text is too short, source contains '+source.length+', translation contains '+translation.length;
            result.fixes = []
            return result;            
        }
        else{
            var result = {
                success: true
            };
        }
    }else{
        result.message = 'The translation text is empty, though source contains '+source.length+' characters';
        result.fixes = []
        return result;
    }
} else{
var result = {
    success: true
};
}


return result;