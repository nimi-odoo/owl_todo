from odoo import api, fields, models

class ResPartner(models.Model):
    _inherit="res.partner"

    # point-of-sale
    customer_type = fields.Selection(string="Customer Type", selection=[("consumer", "Consumer"), ("patient", "Patient"), ("caregiver", "Caregiver"), ("external_patient", "External Patient")])
    username = fields.Char()
    expected_salary = fields.Integer()

    # website
    date_of_birth = fields.Date(string="Date of Birth")
    gender = fields.Selection(string="Gender", selection=[("hombre", "Hombre"), ("mujer", "Mujer")])
    id_number = fields.Char()
    barrio = fields.Char()


