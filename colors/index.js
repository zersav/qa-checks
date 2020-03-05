/*
* 25.02.12
*
* @author Sergiy zaveruhka
* @email sergiy.zaverukha.98@gmail.com
*
* plain string +
* plural -
* icu -
*/

var result = { success: false }
var solution = []

// monkey_patch
Array.prototype.difference = function (array) {
  var difference = this.copy()
  for (var i = 0; i < array.length; i++) {
    if (difference.includes(array[i])) { difference.splice(difference.indexOf(array[i], 1)) }
  }
  return difference
}

Array.prototype.copy = function () {
  return this.slice(0)
}

Array.prototype.includes = function (element) {
  return (this.indexOf(element) != -1)
}
// monkey patch

patern = /(#([0-9a-fA-F]{3}){1,2}|(rgb|hsl)\((\[0-9]{1,3}%?,\s?){3}(1|0?\.[0-9]+)\)|(rgb|hsl)\([0-9]{1,3}%?(,\s?[0-9]{1,3}%?){2}\))(?=\s|$)/g


source = crowdin.source.match(patern) || []
translation = crowdin.translation.match(patern) || []
translation_text = crowdin.translation

sourceDiff = source.difference(translation)
translationDiff = translation.difference(source)

if (sourceDiff.length == 0 && translationDiff == 0) {
    result.success = true
  } else {
    if (sourceDiff.length == 0) {
      for (var i = 0; i < translationDiff.length; i++) {
        result.message = 'you added extra shortcuts'
        var temporary_variable = translation_text.indexOf(translationDiff[i])
        solution.push({
          from_pos: temporary_variable,
          to_pos: temporary_variable + 1,
          replacement: ''
        })
      }
    } else if (translationDiff.length == 0) {
      result.message = 'You have some missing color(s) in translation.'
      result.message += 'Color(s): (' + sourceDiff + ')'
    } else {
      result.message = 'Different color(s) in the tapes'
      result.message += 'Extra color(s): (' + translationDiff + ')'
      result.message += 'issing color(s): (' + sourceDiff + ')'
    }
  }
  
if (result.success == false) { result.fixes = solution }
  
return result