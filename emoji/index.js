/*
* 23.02.12
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

// emoji patern
patern = /(:\w+:)|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

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
      result.message = 'you added extra emoji'
      var temporary_variable = translation_text.indexOf(translationDiff[i])
      solution.push({
        from_pos: temporary_variable,
        to_pos: temporary_variable + 1,
        replacement: ''
      })
    }
  } else if (translationDiff.length == 0) {
    result.message = 'you forgot to add some emoji'
    result.message += ' forgotten emoji (' + sourceDiff + ')'
  } else {
    result.message = 'different emoji in the tapes'
    result.message += ' extra emoji (' + translationDiff + ')'
    result.message += ' forgotten emoji (' + sourceDiff + ')'
  }
}

if (result.success == false) { result.fixes = solution }

return result


// test string 

// correct
// source : 😉
// translation : 😉

// extra emoji
// source : 😉
// translation : 😉😉

// forget emoji
// source : 😉😉
// translation : 😉

// different emoji
// source : 😉
// translation : 😭