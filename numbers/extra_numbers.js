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
var pat = /[\p{L}]{0,1}(\d{1,})[\p{L}]{0,1}/g;

function removeElementFromArray(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
            break;
        }
    }
    return arr;
}

function differenceBetweenTwoArrays(arr1, arr2) {
    var tempArr1 = arr1.slice(0);
    var tempArr2 = arr2.slice(0);
    for (i = 0; i < tempArr2.length; i++) {
        removeElementFromArray(tempArr1, tempArr2[i]);
    }
    return tempArr1;
}

if (source.match(pat) != null) {
    sourceMatchArray = source.match(pat).slice(0);
} else {
    sourceMatchArray = [];
}

if (translation.match(pat) != null) {
    translationMatchArray = translation.match(pat).slice(0);
} else {
    translationMatchArray = [];
}

var extraNumbersInTranslate = differenceBetweenTwoArrays(translationMatchArray, sourceMatchArray).slice(0);

if (extraNumbersInTranslate.length != 0) {
    result.message = 'The translate text have some extra numbers. Extra numbers in translate: ' + extraNumbersInTranslate;
    result.fixes = []
    while ((matchInfo = pat.exec(translation)) !== null) {
        if (extraNumbersInTranslate.indexOf(matchInfo[0]) != -1) {
            var fix = {
                from_pos: matchInfo.index,
                to_pos: pat.lastIndex,
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