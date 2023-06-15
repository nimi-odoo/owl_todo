odoo.define("owlguy.PartnerDetailsRequiredFields", function(require) {
    'use strict';

    const { _t } = require('web.core');
    const Registries = require('point_of_sale.Registries');
    const PartnerDetailsEdit = require('point_of_sale.PartnerDetailsEdit');
    
    const PartnerDetailsEditRequiredFields = (PartnerDetailsEdit) => class extends PartnerDetailsEdit {
        /** 
          * @override 
          * Modified from only requiring name to requiring name, vat and phone */
        saveChanges() {
            let processedChanges = {};
            for (let [key, value] of Object.entries(this.changes)) {
                if (this.intFields.includes(key)) {
                    processedChanges[key] = parseInt(value) || false;
                } else {
                    processedChanges[key] = value;
                }
            }

            // Determine if there are any missing required fields
            let guidanceMessages = ""
            if ((!this.props.partner.name && !processedChanges.name) ||
                processedChanges.name === '' ) {
                guidanceMessages = guidanceMessages.concat("", "Customer Name");
            }
            if ((!this.props.partner.vat && !processedChanges.vat) ||
            processedChanges.vat === '' ) {
                guidanceMessages = guidanceMessages.concat("\n", "VAT (Tax ID)");
            }
            if ((!this.props.partner.phone && !processedChanges.phone) ||
            processedChanges.phone === '' ) {
                guidanceMessages = guidanceMessages.concat("\n", "Phone Number");
            }

            // If any missing required fields have been found, let the user
            // know they are needed
            if (0 < guidanceMessages.length) {
                return this.showPopup('ErrorPopup', {
                    title: _t('The following fields are required:'),
                    body: guidanceMessages,
                });
            }
            
            processedChanges.id = this.props.partner.id || false;
            this.trigger('save-changes', { processedChanges });
        }
    }

    Registries.Component.extend(PartnerDetailsEdit, PartnerDetailsEditRequiredFields);
    return PartnerDetailsEditRequiredFields;
});