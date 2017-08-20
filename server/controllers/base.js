'use strict';

module.exports = {
  missing: {
    handler: function(request, reply){
      var i18n = request.i18n;
      var aboutLink = (function() { switch (i18n.getLocale) {
        case 'de-DE' : return 'uber-boats-com';
        case 'es-ES' : return 'acerca';
        case 'fr-FR' : return 'apropos';
        case 'it-IT' : return 'chi-siamo';
        case 'nl-NL' : return 'over';
        default : return 'about';
      }})();
      reply.view('404', {
        title: i18n.__('404.title'),
        home: '/',
        about: '/boat-content/' + aboutLink + '/'
      }).code(404);
    }
  }
};

