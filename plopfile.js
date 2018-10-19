module.exports = function(plop) {
  // Partials

  plop.setGenerator('partial', {
    description: 'Generate a twig partial',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'Partial file name',
        default: 'partial',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './app/_partials/_{{ dashCase filename }}.twig'
      },
      {
        type: 'add',
        path: './app/styles/_partials/_{{ dashCase filename }}.scss',
        template:'.{{ dashCase filename}} {}'
      },
      {
        type: 'append',
        path: './app/styles/main.scss',
        template: '@import "_partials/_{{ dashCase filename }}";\n'
      },
    ],
  });

  // Page

  plop.setGenerator('page', {
    description: 'Generate a HTML page',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'Page file name',
        default: 'index',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './app/{{ lowerCase filename }}.html',
        template: '{% extends "_layouts/base.twig" %}\n' +
        '{% block title %}{{ lowerCase filename }}{% endblock %}\n' +
        '{% block body_class %}{{ lowerCase filename }}{% endblock %}\n' +
        '\n' +
        '{% block content %}\n' +
        '    Blank\n' +
        '{% endblock %}\n',
      },
      {
        type: 'add',
        path: './app/styles/_pages/_page-{{ dashCase filename }}.scss',
        template:'.page-{{ dashCase filename}} {}'
      },
      {
        type: 'append',
        path: './app/styles/main.scss',
        template: '@import "_partials/_page-{{ dashCase filename }}";\n'
      },
    ],
  });

  // Helpers

  plop.setHelper('relativePath', function(path) {
    let relativePath = '';
    const parts = path.split(/\//g);

    if (path === '.' || !parts.length) {
      return './';
    }

    parts.forEach(() => {
      relativePath += '../';
    });

    return relativePath;
  });
};
