import jQuery from 'jquery';
import Cookies from 'js-cookie';
import Foundation from 'foundation-sites';

const app = {
  foundation: () => {
    Foundation.Dropdown.defaults.hOffset = 0;
    Foundation.Dropdown.defaults.vOffset = 0;
    Foundation.Dropdown.defaults.closeOnClick = true;
    Foundation.Equalizer.defaults.equalizeOnStack = true;

    jQuery(document).foundation();
  },
  start: () => {
    app.cookies();
    app.foundation();
  },
  cookies: () => {
    const bar = jQuery('.cookies');
    const btn = jQuery('.cookies button');

    bar.hide();
    if (Cookies.get('cookiebar') !== 'true') {
      bar.show();
    }

    btn.click(function(e) {
      e.preventDefault();
      bar.fadeOut();
      Cookies.set('cookiebar', true, {
        path: '/',
        secure: false,
        domain: '',
        expires: 30,
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  app.start();
});
