odoo.define("owlguy.PartnerDetailsEdit", function(require) {
    'use strict';
    const Registries = require('point_of_sale.Registries');
    const PartnerDetailsEdit = require('point_of_sale.PartnerDetailsEdit');
    const { onWillStart } = owl;
    
    const PartnerDetailsEditInherit = (PartnerDetailsEdit) => class extends PartnerDetailsEdit {
        setup() {
            super.setup();
            const partner = this.props.partner;

            this.customerTypes = [
                ["consumer", "Consumer"],
                ["patient", "Patient"],
                ["caregiver", "Caregiver"],
                ["external_patient", "External Patient"],
            ]

            onWillStart(async () => {
                await this.refreshCustomerTypeOfPartner(partner);
            })
        }
        async refreshCustomerTypeOfPartner(partner) {
            console.log("env", this)
            const partnerWithUpdatedCustomerType = await this.rpc({
                model: 'res.partner',
                method: 'search_read',
                fields: ['customer_type'],
                domain: [['id', '=', partner.id]],
            });
            this.customerType = partnerWithUpdatedCustomerType[0]?.customer_type
            return partnerWithUpdatedCustomerType;
        }
    }
    Registries.Component.extend(PartnerDetailsEdit, PartnerDetailsEditInherit);
    return PartnerDetailsEditInherit;
});
