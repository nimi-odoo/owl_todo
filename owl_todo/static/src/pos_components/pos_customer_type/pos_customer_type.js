odoo.define("owlguy.PartnerDetailsEdit", function(require) {
    'use strict';
    const Registries = require('point_of_sale.Registries');
    const PartnerDetailsEdit = require('point_of_sale.PartnerDetailsEdit');
    const { useState } = owl;
    console.log("PartnerDetailsEdit", PartnerDetailsEdit)

    const PartnerDetailsEditInherit = (PartnerDetailsEdit) => class extends PartnerDetailsEdit {
        setup() {
            this.state = useState({
                customerType: "None",
            })
            this.changes = {
                ...this.changes,
                'customer_type': this.state.customerType,
            }
            this.customerTypes = [
                "Consumer",
                "Patient",
                "Caregiver",
                "External Patient",
            ]
            super.setup(...arguments)
        }
    }
    Registries.Component.extend(PartnerDetailsEdit, PartnerDetailsEditInherit);
    return PartnerDetailsEdit;
});
