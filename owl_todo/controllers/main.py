from odoo.addons.website_sale.controllers.main import WebsiteSale

class WebsiteSaleInherit(WebsiteSale):
    def _get_mandatory_fields_billing(self, country_id=False):
        req = super()._get_mandatory_fields_billing(country_id)
        req += ['mobile', 'date_of_birth', 'id_number', 'barrio']
        return req

    def _get_mandatory_fields_shipping(self, country_id=False):
        req = super()._get_mandatory_fields_shipping(country_id)
        req += ['mobile', 'date_of_birth', 'id_number', 'barrio']
        return req
