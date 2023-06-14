from odoo import api, fields, models

class ResPartner(models.Model):
    _inherit="res.partner"

    customer_type = fields.Selection(string="Customer Types", selection=[("consumer", "Consumer"), ("patient", "Patient"), ("caregiver", "Caregiver"), ("external_patient", "External Patient")])


