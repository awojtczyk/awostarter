import jQuery from 'jquery';
import Cookies from 'js-cookie';

const app = {
  start: () => {
    app.cookies();
  },
  cookies: () => {
    const bar = jQuery('.cookies');
    const btn = jQuery('.cookies button');

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
