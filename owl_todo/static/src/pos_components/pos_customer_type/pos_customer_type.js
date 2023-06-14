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
    // PartnerDetailsEdit.template = "owl.ResPartnerFormView2"
    Registries.Component.extend(PartnerDetailsEdit, PartnerDetailsEditInherit);
    return PartnerDetailsEdit;
});



/** @odoo-module **/

// import { patch } from '@web/core/utils/patch';
// import { PartnerDetailsEdit } from "@point_of_sale/js/Screens/PartnerListScreen/PartnerDetailsEdit";
// import { PartnerDetailsEdit } from "@point_of_sale/js/";
// import { PartnerDetailsEdit } from "@partner_autocomplete/js/partner_autocomplete_core"

// import { registry } from "@web/core/registry";
// import { kanbanView } from "@web/views/kanban/kanban_view";
// import { useService } from "@web/core/utils/hooks";

// const { onWillStart } = owl;
// class maybeThis extends PartnerDetailsEdit {
//     setup() {
//         console.log("PartnerDetailsEdit loaded")
//         super.setup();
//     }
// }

// console.log("patching...")
// patch(PartnerDetailsEdit.prototype, "matthew rwasenge", {
//     setup() {
//         console.log("hewo")
//         super.setup();
//         // this._super();
//         onWillStart(console.log("hello there world"))
//     },
// });





