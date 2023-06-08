# -*- coding: utf-8 -*-
{
    'name': "Todolist",
    'summary': """
        Todolist written in OWL
    """,
    'description': """
        This is a todolist, written in OWL.
    """,
    'author': "Odoo",
    'website': "https://www.odoo.com",
    'license': 'OPL-1',
    'application': True,
    'category': 'OWL',
    'version': '0.1',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/todo_list.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'owl_todo/static/src/components/*/*.js',
            'owl_todo/static/src/components/*/*.xml',
            'owl_todo/static/src/components/*/*.scss'
        ],
    },
}