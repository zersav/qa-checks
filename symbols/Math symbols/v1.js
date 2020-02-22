var characters = ['+', '±', '–', '=', '≠', '≈', '≅', '≡', '*', '×', '÷', '/', '<', '>', '≤', '≥', '∑', '∏', '∫', '∩', '∀', '∃', '∅', '∂', '∇', '⊂', '⊃', '∪', '∈', '∉', '∋', '∠', '∴', '⊕', '⊗', '⊥', '√', '∝', '∞']; //Our characters

var result = {
    success: false
};
if (crowdin.contentType == "application/vnd.crowdin.text+plural") {
    var obj = JSON.parse(crowdin.source);
    source = obj[crowdin.context.pluralForm];
} else {
    source = crowdin.source;
}

translation = crowdin.translation;
var regex = new RegExp('[' + characters.join("") + ']', 'g');
sourceMatch = source.match(regex);
translationMatch = translation.match(regex);

function UnionArrays(A, B) {
    arr = A.concat(B);
    arr.sort();
    var C = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] != arr[i - 1]) {
            C.push(arr[i]);
        }
    }
    return C;
}

function ArrayContains(A, item) {
    for (var i = 0; i < A.length; i++) {
        if (A[i] == item) {
            return true;
        }
    }
    return false;
}

if (sourceMatch != null || translationMatch != null) {
    var sourceResult = {};
    var translationResult = {};
    var sourceProps = [];
    var translationProps = [];
    var mergedProps = [];
    var solution = [];
    if (sourceMatch != null && translationMatch != null) {
        for (var i = 0; i < sourceMatch.length; ++i) {
            var a = sourceMatch[i];
            if (sourceResult[a] != undefined)
                ++sourceResult[a];
            else
                sourceResult[a] = 1;
        }

        for (var j = 0; j < translationMatch.length; ++j) {
            var a = translationMatch[j];
            if (translationResult[a] != undefined)
                ++translationResult[a];
            else
                translationResult[a] = 1;
        }
        sourceProps = Object.getOwnPropertyNames(sourceResult);
        translationProps = Object.getOwnPropertyNames(translationResult);
        mergedProps = UnionArrays(sourceProps, translationProps);
    }
    if (sourceMatch != null || translationMatch != null) {
        if (sourceMatch == null) {
            for (var j = 0; j < translationMatch.length; ++j) {
                var a = translationMatch[j];
                if (translationResult[a] != undefined)
                    ++translationResult[a];
                else
                    translationResult[a] = 1;
            }
            translationProps = Object.getOwnPropertyNames(translationResult);
            mergedProps = translationProps;
        } else if (translationMatch == null) {
            for (var i = 0; i < sourceMatch.length; ++i) {
                var a = sourceMatch[i];
                if (sourceResult[a] != undefined)
                    ++sourceResult[a];
                else
                    sourceResult[a] = 1;
            }
            sourceProps = Object.getOwnPropertyNames(sourceResult);
            mergedProps = sourceProps;
        }
    }
    var messageArray = [];
    var replacementArray = [];
    for (var u = 0; u < mergedProps.length; u++) {
        if (ArrayContains(sourceProps, mergedProps[u]) && ArrayContains(translationProps, mergedProps[u])) { // Both contain symbol
            if (sourceResult[mergedProps[u]] == translationResult[mergedProps[u]]) {
                continue;
            } else {
                messageArray.push('source contain \'' + mergedProps[u] + '\' ' + sourceResult[mergedProps[u]] + ' time(s), when translation contain ' + translationResult[mergedProps[u]] + ' time(s)');
            }
        } else if (ArrayContains(sourceProps, mergedProps[u]) && !ArrayContains(translationProps, mergedProps[u])) {
            messageArray.push('translation dont contain \'' + mergedProps[u] + '\', when source contain ' + sourceResult[mergedProps[u]] + ' time(s)');
        } else if (!ArrayContains(sourceProps, mergedProps[u]) && ArrayContains(translationProps, mergedProps[u])) {
            messageArray.push('source string dont contain \'' + mergedProps[u] + '\'');
            replacementArray.push(mergedProps[u]);
        }
    }
    if (replacementArray != null) {
        var tempIndex;
        var repRegex = new RegExp('[' + replacementArray.join("") + ']', 'g');
        for (var i = 0; i < replacementArray.length; i++) {
            for (var j = 0; j < translationResult[replacementArray[i]]; j++) {
                tempIndex = repRegex.exec(translation).index;
                solution.push({
                    from_pos: tempIndex,
                    to_pos: tempIndex + 1,
                    replacement: ''
                });
            }
        }
    }
    result.fixes = solution;
    result.message = 'Next issue(s) found: ' + messageArray.join('; ') + '.';
} else {
    result.success = true;
}

return result;