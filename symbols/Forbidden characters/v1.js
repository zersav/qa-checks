var result = {
    success: false
};

var characters = ['!', '@', '#', '$', '%']; //Our characters
if (crowdin.contentType == "application/vnd.crowdin.text+plural") {
    var obj = JSON.parse(crowdin.source);
    source = obj[crowdin.context.pluralForm].replace(/(?:\r\n|\r)/g, '\n');
} else {
    source = crowdin.source.replace(/(?:\r\n|\r)/g, '\n');
}
translation = crowdin.translation.replace(/(?:\r\n|\r)/g, '\n');
var regex = new RegExp('[' + characters.join("") + ']', 'g');
sourceMatch = source.match(regex);
translationMatch = translation.match(regex);

if (sourceMatch != null || translationMatch != null) {
    if (sourceMatch != null && translationMatch == null) { //If match in source
        var solution = [];
        var tempIndex;
        result.message = 'The sourse text contains ' + sourceMatch.length + ' restricted character(s).';
        result.fixes = [];
    } else if (sourceMatch == null && translationMatch != null) { //If match in translation
        var solution = [];
        var tempIndex;
        result.message = 'The translation text contains ' + translationMatch.length + ' restricted character(s).';
        for (var i = 0; i < translationMatch.length; i++) {
            tempIndex = regex.exec(translation).index;
            solution[i] = {
                from_pos: tempIndex,
                to_pos: tempIndex + 1,
                replacement: ''
            };
        }
        result.fixes = solution;
    } else if (sourceMatch != null && translationMatch != null) { //If match in both
        var solution = [];
        var tempIndex;
        result.message = 'The source and translation text contains restricted character(s).';
        for (var i = 0; i < translationMatch.length; i++) {
            tempIndex = regex.exec(translation).index;
            solution[i] = {
                from_pos: tempIndex,
                to_pos: tempIndex + 1,
                replacement: ''
            };
        }
        result.fixes = solution;
    }
} else {
    result.success = true;
}

return result;