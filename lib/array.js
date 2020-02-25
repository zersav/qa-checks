/*
*23.02.12
*
* операції над масивами
* array!=set
* 
* різниця 
* додавання
* перетин 
*/

//різниця
//для використання в crowdin-script-editor необхідно скопіювати:
//copy з array.js
//includes з monkey_patch.js
Array.prototype.difference = function (array) {
  var difference = this.copy()
  for (var i = 0; i < array.length; i++) {
    if (difference.includes(array[i])) { difference.splice(difference.indexOf(array[i], 1)) }
  }
  return difference
}


//перетин
//для використання в crowdin-script-editor необхідно скопіювати:
//includes з monkey_patch.js
Array.prototype.intersection = function (array) {
  var union = []
  for (var i = 0; i < array.length; i++) {
    if (this.includes(array[i])) { union.push(array[i]) }
  }
  return union
}

//додавання двох масивів 
//для використання в crowdin-script-editor необхідно скопіювати:
//copy з array.js
Array.prototype.union = function (array) {
  var union = this.copy
  for (var i = 0; i < array.length; i++) {
    this.push(array[i])
  }
  return union
}


Array.prototype.copy = function () {
    return this.slice(0)
}