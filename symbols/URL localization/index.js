// Config section

var yourTargetDomainUrl
var yourMainDomainUrl = 'crowdin.com' // Set your main domain URL in next format 'example.com' or 'example.com.ua';

// Configure next function with your target languages and related domains in the following form:

// case 'your target language':
// yourTargetDomainUrl = 'example.com' where 'example.com' or 'example.com.ua' your domain for current language

switch (crowdin.targetLanguage) {
  case 'uk':
    yourTargetDomainUrl = 'crowdin.ua'
    break

  case 'de':
    yourTargetDomainUrl = 'crowdin.de'
    break

  case 'pl':
    yourTargetDomainUrl = 'crowdin.com.pl'
    break

  case 'es':
    yourTargetDomainUrl = 'crowdin.es'
    break

  default: // If there is no specific domain for target language, the main domain will be selected
    yourTargetDomainUrl = yourMainDomainUrl
    break
}

// Code section

var result = {
  success: false
}

if (crowdin.contentType === 'application/vnd.crowdin.text+plural') {
  var obj = JSON.parse(crowdin.source)
  source = obj[crowdin.context.pluralForm]
} else {
  source = crowdin.source
}

var translation = crowdin.translation
var patternForMainDomain, patternForTargetDomain
if (yourMainDomainUrl.split('.').length === 2) { // Formating regex depending on which domains you specified ('example.com' or 'example.com.ua')
  patternForMainDomain = new RegExp('(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?' + yourMainDomainUrl.split('.')[0] + '\.' + yourMainDomainUrl.split('.')[1], 'g')
} else if (yourMainDomainUrl.split('.').length === 3) {
  patternForMainDomain = new RegExp('(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?' + yourMainDomainUrl.split('.')[0] + '\.' + yourMainDomainUrl.split('.')[1] + '\.' + yourMainDomainUrl.split('.')[2], 'g')
}
if (yourTargetDomainUrl.split('.').length === 2) {
  patternForTargetDomain = new RegExp('(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?' + yourTargetDomainUrl.split('.')[0] + '\.' + yourTargetDomainUrl.split('.')[1], 'g')
} else if (yourTargetDomainUrl.split('.').length === 3) {
  patternForTargetDomain = new RegExp('(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?' + yourTargetDomainUrl.split('.')[0] + '\.' + yourTargetDomainUrl.split('.')[1] + '\.' + yourTargetDomainUrl.split('.')[2], 'g')
}

var sourceMatch = source.match(patternForMainDomain)
var translationMatch = translation.match(patternForTargetDomain)

if (sourceMatch.length !== translationMatch.length) {
  result.fixes = []
  if (sourceMatch.length <= translationMatch.length) {
    result.message = 'URL localization. Found extra localizated URL in translation.'
  } else if (sourceMatch.length >= translationMatch.length) {
    result.message = 'URL localization. Found missed localizated URL in translation.'
  }
} else {
  result.success = true
}

return result