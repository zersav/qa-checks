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
var solution = [];

function checkStr ( str ){
  var massOfWords = [];
  var indexUsedCount = -1;
  var indexArr = [];
  var tempIndex;
  var regex = /[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]+/g;
  massOfWords = translation.match(regex);
  for (var i = 1; i < massOfWords.length; i++){
    if (massOfWords[i-1].toLowerCase() == massOfWords[i].toLowerCase()){
      for (indexUsedCount; indexUsedCount <i; indexUsedCount++){
        tempIndex = regex.exec(translation).index;
        indexArr.push(tempIndex);
      }
      if (translation[tempIndex-1] == translation[tempIndex + massOfWords[i].length]){
        solution.push({
          from_pos: tempIndex - 1,
          to_pos: tempIndex + massOfWords[i].length,
          replacement: ''
        });
      }
      else{
        var punctArray = [".", "'", "[", "]", "(", ")", "{", "}", "⟨", "⟩", ":", ",", "،", "、", "‒", "–", "—", "―", "…", "!", ".", "‹", "›", "«", "»", "‐", "-", "?", "'", "'", "“", "”", "'", 
                          '"', ";", "/", "⁄", "·", "&", "*", "@", "•", "^", "†", "‡", "°", "”", "¡", "¿", "※", "#", "№", "÷", "×", "º", "ª", "%", "‰", "+", "−", "=", "‱", "¶", "′", "″", "‴", 
                          "§", "~", "_", "|", "‖", "¦", "©", "℗", "®", "℠", "™", "¤", "₳", "฿", "₵", "¢", "₡", "₢", "$", "₫", "₯", "֏", "₠", "€", "ƒ", "₣", "₲", "₴", "₭", "₺", "₾", "ℳ", "₥", "₦", 
                          "₧", "₱", "₰", "£", "៛", "₽", "₹", "₨", "₪", "৳", "₸", "₮", "₩", "¥"];
        if (translation[tempIndex - 1] == " " && punctArray.indexOf(translation[tempIndex + massOfWords[i].length]) != -1){
          solution.push({
            from_pos: tempIndex -1,
            to_pos: tempIndex + massOfWords[i].length,
            replacement: ''
          });
        }
        else{
          if (i != massOfWords.length - 1){
            solution.push({
              from_pos: tempIndex,
              to_pos: tempIndex + massOfWords[i].length,
              replacement: ''
            });
          }
          else if (i == massOfWords.length - 1 && translation[tempIndex - 1] == " "){
            solution.push({
              from_pos: tempIndex -1,
              to_pos: tempIndex + massOfWords[i].length,
              replacement: ''
            });
          }
          else if (i == massOfWords.length - 1 && translation[tempIndex - 1] != " "){
            solution.push({
              from_pos: tempIndex,
              to_pos: tempIndex + massOfWords[i].length,
              replacement: ''
            });
          }
        }
      }
    }
  }
}

checkStr(translation);
if (solution != null){
  result.message = 'Found dublicate(s) of words in translation.';
  result.fixes = solution;
} else{
  result.success = true;
}
return result;