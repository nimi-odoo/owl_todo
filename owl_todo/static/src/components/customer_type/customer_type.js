/** @odoo-module **/

import { registry } from "@web/core/registry";
import { formView } from "@web/views/form/form_view";
import { FormController } from "@web/views/form/form_controller";
import { useService } from "@web/core/utils/hooks";

class ResPartnerPOSFormController extends FormController {
    setup() {
        console.log("customer_type form view loaded")
        super.setup();
    }
}
ResPartnerPOSFormController.template = "owl.ResPartnerPOSFormView"

export const resPartnerPOSFormView = {
    ...formView,
    Controller: ResPartnerPOSFormController,
}

class resPartnerCustomerType {}
resPartnerCustomerType.template = "owl.ResPartnerPOSFormView"

registry.category("views").add("res_partner_pos_inherit_form_view", resPartnerPOSFormView)
