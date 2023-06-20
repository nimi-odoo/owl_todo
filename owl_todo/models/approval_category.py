from odoo import api, fields, models

CATEGORY_SELECTION = [
    ('required', 'Required'),
    ('optional', 'Optional'),
    ('no', 'None')]

class ApprovalCategory(models.Model):
    _inherit = "approval.category"

    has_bank_account = fields.Selection(CATEGORY_SELECTION, string="Has Bank Account", default="no", required=True)
