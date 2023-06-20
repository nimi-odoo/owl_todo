from odoo import api, fields, models

class ApprovalRequest(models.Model):
    _inherit = "approval.request"

    has_bank_account = fields.Selection(related="category_id.has_bank_account")
    bank_account = fields.Many2one(string="Bank Info", comodel_name="res.partner.bank")

    def action_approve(self, approver=None):
        super().action_approve(approver)

        employee_id = self.env['hr.employee'].search([("user_id.id", "=", self.request_owner_id.id)])
        print("\n\nemployee_id:", employee_id, "\n\n")
        employee_id.bank_account_id = self.bank_account

