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
        path: './app/_partials/_{{ dashCase filename }}.twig',
      },
      {
        type: 'add',
        path: './app/styles/_partials/_{{ dashCase filename }}.scss',
        template: '.{{ dashCase filename}} {}',
      },
      {
        type: 'append',
        path: './app/styles/_partials.scss',
        template: '@import "_partials/_{{ dashCase filename }}";\n',
      },
    ],
  });
  // Component
  plop.setGenerator('component', {
    description: 'Generate a component',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'Component file name',
        default: 'partial',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './app/_partials/components/_{{ dashCase filename }}.twig',
      },
      {
        type: 'add',
        path: './app/styles/_components/_{{ dashCase filename }}.scss',
        template: '.{{ dashCase filename}} {}',
      },
      {
        type: 'append',
        path: './app/styles/_components.scss',
        template: '@import "_components/_{{ dashCase filename }}";\n',
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
        template:
          '{% extends "_layouts/base.twig" %}\n' +
          '{% block title %}page-{{ dashCase filename}}{% endblock %}\n' +
          '{% block body_class %}{{ lowerCase filename }}{% endblock %}\n' +
          '\n' +
          '{% block content %}\n' +
          '    Blank\n' +
          '{% endblock %}\n',
      },
      {
        type: 'add',
        path: './app/styles/_pages/_page-{{ dashCase filename }}.scss',
        template: '.page-{{ dashCase filename}} {}',
      },
      {
        type: 'append',
        path: './app/styles/_pages.scss',
        template: '@import "_pages/_page-{{ dashCase filename }}";\n',
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
