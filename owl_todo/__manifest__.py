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
    'depends': ['base', 'web', 'point_of_sale', 'sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/todo_list.xml',
        'views/res_partner.xml',
        'views/hr_employee_views.xml',
        'views/approval_request_views.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'owl_todo/static/src/components/*/*.js',
            'owl_todo/static/src/components/*/*.xml',
            'owl_todo/static/src/components/*/*.scss'
        ],
        'web.assets_frontend': [
            'owl_todo/static/src/website_components/*/*.js',
            'owl_todo/static/src/website_components/*/*.xml',
            'owl_todo/static/src/website_components/*/*.scss'
        ],
        'point_of_sale.assets': [
            'owl_todo/static/src/pos_components/*/*.js',
            'owl_todo/static/src/pos_components/*/*.xml',
            'owl_todo/static/src/pos_components/*/*.scss'
        ]
    },
}