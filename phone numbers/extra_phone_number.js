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
// /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g

function removeElementFromArray(arrayToRemoveFrom, Element) {
    for (var i = 0; i < arrayToRemoveFrom.length; i++) {
        if (arrayToRemoveFrom[i] === Element) {
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

if (source.match(pat) != null) {
    while (matchIterator = pat.exec(source)) {
        for (i = 1; i < matchIterator.length; i++) {
            if (matchIterator[i] != null) {
                sourceMatchArray.push(matchIterator[i]);
                break;
            }
        }

    }
}

var translationMatchArray = [];

if (translation.match(pat) != null) {
    while (matchIterator = pat.exec(translation)) {
        for (i = 1; i < matchIterator.length; i++) {
            if (matchIterator[i] != null) {
                translationMatchArray.push(matchIterator[i]);
                break;
            }
        }

    }
}

var extraNumbersInTranslate = differenceBetweenTwoArrays(translationMatchArray, sourceMatchArray).slice(0);

if (extraNumbersInTranslate.length != 0) {
    result.message = 'The translate text have some extra/changed phone number(s). Extra/changed phone number(s) in translate: ' + extraNumbersInTranslate;
    result.fixes = []
    while ((matchInfo = phoneNumberPattern.exec(translation)) !== null) {
        if (extraNumbersInTranslate.indexOf(matchInfo[0]) != -1) {
            var fix = {
                from_pos: matchInfo.index,
                to_pos: phoneNumberPattern.lastIndex,
                replacement: ""
            };
            result.fixes.splice(0, 0, fix);
            removeElementFromArray(extraNumbersInTranslate, matchInfo[0]);
        }
    }
    return result;
} else {

    return result = {
        success: true
    };
}

return result;