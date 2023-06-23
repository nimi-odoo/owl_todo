/** @odoo-module */

import { registry } from "@web/core/registry";
import { CharField } from "@web/views/fields/char/char_field";

class UsernameField extends CharField {
    
    get emailDomain() {
        const { email } = this.props.record.data;
        return email ? email.split("@")[1] : '';
    }
}
UsernameField.supportedTypes = ["char"];
UsernameField.components = { CharField };
UsernameField.template = "owl.UsernameField";

registry.category("fields").add("username", UsernameField)
