var result = {success: false};

if(crowdin.contentType=="application/vnd.crowdin.text+plural"){
var obj = JSON.parse(crowdin.source);
source = obj[crowdin.context.pluralForm].replace(/(?:\r\n|\r)/g, '\n');
}else{
source = crowdin.source.replace(/(?:\r\n|\r)/g, '\n');
}
translation = crowdin.translation.replace(/(?:\r\n|\r)/g, '\n');
var pat = /[\p{L}]{0,1}(\d{1,})[\p{L}]{0,1}/g;

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
          break;
        }
    }
    return arr;
}
 

function difference(arr1,arr2){
  var tempArr1=arr1.slice(0);
    var tempArr2=arr2.slice(0);
  for(i = 0;i<tempArr2.length;i++)
  {
      removeA(tempArr1,tempArr2[i]);
  }
  return tempArr1;
}

//match arrays
var sourceMatchArray = [];
var translationMatchArray = [];
sourceMatchArray =  source.match(pat);
if(sourceMatchArray==null){sourceMatchArray =[]}
translationMatchArray = translation.match(pat)
if(translationMatchArray==null){translationMatchArray =[]}

sourceInsertedWordCount = null !== sourceMatchArray ? sourceMatchArray.length : 0;
translationInsertedWordCount = null !== translationMatchArray ? translationMatchArray.length : 0; 

var extraNumbersSource = [];
var extraNumbersTranslate = [];

extraNumbersSource = difference(sourceMatchArray,translationMatchArray);
extraNumbersTranslate = difference(translationMatchArray,sourceMatchArray);
//return sourceMatchArray + ":"+translationMatchArray

  if(extraNumbersSource.length==0&&extraNumbersTranslate==0){
    return result = {success: true}    
  }else if(extraNumbersSource.length==0){
      
    return result = {success: true};
  }else if(extraNumbersTranslate==0){
      result.message = 'The translate text have some missing numbers. Missing numbers in translate: '+extraNumbersSource;
      result.fixes = []
      return result;
    }
    else{
      return result = {success: true};
    }
    
  
return result;