from odoo import api, fields, models

class OwlTodo(models.Model):
    _name = "owl_todo"
    _description = "OWL Todo List"

    name = fields.Char(string="Task Name")
    completed = fields.Boolean()
    color = fields.Char()
