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

patern = /(\S*\s?\+\s?)+\S*/g


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
          to_pos: temporary_variable+translationDiff[i].length,
          replacement: ''
        })
      }
    } else if (translationDiff.length == 0) {
      result.message = 'you forgot to add some shortcuts'
      result.message += ' forgotten shortcuts (' + sourceDiff + ')'
    } else {
      result.message = 'different shortcuts in the tapes'
      result.message += ' extra shortcuts (' + translationDiff + ')'
      result.message += ' forgotten shortcuts (' + sourceDiff + ')'
    }
  }
  
if (result.success == false) { result.fixes = solution }
  
return result

/* test for patern

Useful Ubuntu keyboard shortcuts

    Super key: Opens Activities search. ...
    Ctrl+Alt+T: Ubuntu terminal shortcut. ...
    Super+L or Ctrl+Alt+L: Locks the screen. ...
    Super+D or Ctrl+Alt+D: Show desktop. ...
    Super+A: Shows the application menu. ...
    Super+Tab or Alt+Tab: Switch between running applications. ...
    Super+Arrow keys: Snap windows.


win10
Ctrl + X 	Вирізання вибраного елемента.
Ctrl + C (або Ctrl + Insert) 	Копіювання вибраного елемента.
Ctrl + V (або Shift + Insert) 	Вставляння вибраного елемента.
Ctrl + Z 	Скасування дії.
Alt + Tab 	Переключення між відкритими програмами.
Alt + F4 	Закриття активного елемента або вихід з активної програми.
Клавіша Windows  + L 	Блокування ПК.
Клавіша Windows  + D 	Відображення чи приховування робочого стола.
F2 	Перейменування вибраного елемента.
F3 	Пошук файлу або папки у Файловому провіднику.
F4 	Відображення списку рядка адреси у Файловому провіднику.
F5 	Оновлення активного вікна.
F6 	Переключення між елементами вікна або робочого стола.
F10 	Активація рядка меню в активній програмі.
Alt + F8 	Відображення пароля на екрані входу.
Alt + Esc 	Переключення між елементами в послідовності, у якій вони були відкриті.
Alt + підкреслена буква 	Виконання команди, яка відповідає цій букві.
Alt + Enter 	Перегляд властивостей вибраного елемента.
Alt + ПРОБІЛ 	Відкриття контекстного меню для активного вікна.
Alt + стрілка вліво 	Повернення назад.
Alt + стрілка вправо 	Перехід вперед.
Alt + Page Up 	Перехід на один екран вище.
Alt + Page Down 	Перехід на один екран нижче.
Ctrl + F4 	Закриття активного документа (у повноекранній програмі, яка підтримує одночасну роботу з кількома документами).
Ctrl + A 	Вибір усіх елементів у документі або вікні.
Ctrl + D (або Delete) 	Видалення вибраного елемента з його переміщенням до кошика.
Ctrl + R (або F5) 	Оновлення активного вікна.
Ctrl + Y 	Повторення дії.
Ctrl + стрілка вправо 	Переміщення курсору на початок наступного слова.
Ctrl + стрілка вліво 	Переміщення курсору на початок попереднього слова.
Ctrl + стрілка вниз 	Переміщення курсору на початок наступного абзацу.
Ctrl + стрілка вгору 	Переміщення курсору на початок попереднього абзацу.
Ctrl + Alt + Tab 	Скористайтеся клавішами зі стрілками для переключення між усіма відкритими програмами.
Alt + Shift + клавіші зі стрілками 	Переміщення у вказаному напрямку групи або плитки, які опинились у фокусі в меню "Пуск".
Ctrl + Shift + клавіші зі стрілками 	Переміщення плитки, яка опинилась у фокусі в меню "Пуск", на іншу плитку для створення папки.
Ctrl + клавіші зі стрілками 	Змінення розміру меню "Пуск", коли воно відкрите.
Ctrl + клавіша зі стрілкою (для переміщення до елемента) + ПРОБІЛ 	Вибір кількох окремих елементів у вікні або на робочому столі.
Ctrl + Shift + клавіша зі стрілкою 	Виділення блоку тексту.
Ctrl + Esc 	Відкриття меню "Пуск".
Ctrl + Shift + Esc 	Відкриття диспетчера завдань.
Ctrl + Shift 	Переключення на іншу розкладку клавіатури, якщо доступно кілька розкладок.
Ctrl + ПРОБІЛ 	Увімкнення або вимкнення редактора засобів вводу (IME) для китайської мови.
Shift + F10 	Відображення контекстного меню для вибраного елемента.
Shift і будь-яка клавіша зі стрілкою 	Вибір кількох елементів у вікні чи на робочому столі (або вибір тексту в документі).
Shift + Delete +sdasd  	Видалення вибраного елемента без його переміщення до кошика.
Стрілка вправо 	Відкриття наступного меню справа або відкриття вкладеного меню.
Стрілка вліво 	Відкриття наступного меню зліва або закриття вкладеного меню.
Esc 	Зупинка або завершення поточного завдання.
Print Screen 	

Створення та копіювання до буфера обміну знімка всього екрана. 

Примітка

    Це сполучення клавіш можна змінити, щоб за його допомогою також відкривався засіб захоплення фрагментів екрана, який дає змогу редагувати знімки екрана. Виберіть елементи Пуск  > Настройки > Спеціальні можливості > Клавіатура й увімкніть перемикач у розділі Сполучення клавіш для захоплення фрагментів екрана.


*/