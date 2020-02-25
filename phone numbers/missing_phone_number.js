var phoneNumberPattern = new RegExp ('([+]{1,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]+)','g');

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

function removeElementFromArray(arrayToRemoveFrom,Element) {    
    for( var i = 0; i < arrayToRemoveFrom.length; i++){ 
        if ( arrayToRemoveFrom[i] === Element) {
            arrayToRemoveFrom.splice(i, 1);
            break;
        }
    }    
    return arrayToRemoveFrom;
}

function differenceBetweenTwoArrays(decreasingArray, deductionArray) {
    var tempDecreasingArray = decreasingArray.slice(0);
    var tempDeductionArray = deductionArray.slice(0);
    for (i = 0; i < tempDeductionArray.length; i++) {
        removeElementFromArray(tempDecreasingArray, tempDeductionArray[i]);
    }
    return tempDecreasingArray;
}

var sourceMatchArray = [];

if (source.match(phoneNumberPattern) != null) {
   while (matchIterator = phoneNumberPattern.exec(source)) {
    for(i =1;i<matchIterator.length;i++)
    {
      if(matchIterator[i]!=null)
      {
            sourceMatchArray.push(matchIterator[i]);
            break;
      }
    }
    
}
}

var translationMatchArray = [];

if (translation.match(phoneNumberPattern) != null) {
   while (matchIterator = phoneNumberPattern.exec(translation)) {
    for(i =1;i<matchIterator.length;i++)
    {
      if(matchIterator[i]!=null)
      {
            translationMatchArray.push(matchIterator[i]);
            break;
      }
    }
    
}
}


var missingNumbersSource = [];

missingNumbersSource = differenceBetweenTwoArrays(sourceMatchArray, translationMatchArray);

if (missingNumbersSource.length != 0) {

    result.message = 'The translate text have some missing phone numbers. Missing phone numbers in translate: ' + missingNumbersSource;
    result.fixes = []
    return result;

} else {
    return result = {
        success: true
    };

}

return result;