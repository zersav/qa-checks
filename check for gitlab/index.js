/*
* 23.02.12
*
* @author Sergiy zaveruhka
* @email sergiy.zaverukha.98@gmail.com
*
* plain string +
* plural +
* icu -
*/

// default status
var result = {
  success: false
}

//all alphabets
patern = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]+\|/g

translation = crowdin.translation.match(patern)

if (translation == null) {
  result.success = true
} else {
  result.message = 'translation should begin after the character "|"'
  result.fixes = [
    {
      from_pos: 0,
      to_pos: translation[0].length,
      replacement: ''
    }
  ]
}

return result

// test string 

// correct
// Cyrillic
// translation : 'українська |'

// correct
// Cyrillic
// translation : 'українська'

// Cyrillic 
// translation : 'українська|'



// correct
// Latin
// translation : 'Latine'

// correct
// Latin
// translation : 'Latine |'

// Latin
// translation : 'Latine|'



// correct
// Chinese
// translation : '汉语'

// Chinese
// translation : '汉语 |'

// Chinese
// translation : '汉语| '



// 
// translation : ''