/* 
 *23.02.12
 *
 * 1) патчі не замінюють доступні методи в https://crowdin.github.io/crowdin-script-editor/
 * 2) патчі в даному файлі реалізують недостаючі функції js ( наприклад array.includes )
 * 
 * сенс існування даних патчів є спроба поліпшити зручність читання коду 
 */

Array.prototype.includes = function (element) {
  return (this.indexOf(element) != -1)
}