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

sourceInsertedWordCount = null !== sourceMatchArray ? sourceMatchArray.length : 0;
translationInsertedWordCount = null !== translationMatchArray ? translationMatchArray.length : 0;

if (sourceInsertedWordCount != translationInsertedWordCount) {
    result.message = 'Count of numbers in translation and source are different: ' + sourceInsertedWordCount + ' in source, ' + translationInsertedWordCount + ' in translation.';
    result.fixes = []
    return result;
} else {
    return result = {
        success: true
    };
}

return result;