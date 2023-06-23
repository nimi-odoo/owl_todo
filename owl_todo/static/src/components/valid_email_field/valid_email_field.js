/** @odoo-module */

import { registry } from "@web/core/registry";
import { EmailField } from "@web/views/fields/email/email_field";

class ValidEmailField extends EmailField {

    get isValidEmail() {
        let re = /\S+@\S+\.\S+/;
        return re.test(this.props.value)
    }
}
ValidEmailField.supportedTypes = ["char"];
ValidEmailField.template = "owl.ValidEmailField";

registry.category("fields").add("valid_email", ValidEmailField)
