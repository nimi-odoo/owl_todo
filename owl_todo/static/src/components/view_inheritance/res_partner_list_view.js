/** @odoo-module **/

import { registry } from "@web/core/registry";
import { listView } from "@web/views/list/list_view";
import { ListController } from "@web/views/list/list_controller";
import { useService } from "@web/core/utils/hooks";

class ResPartnerListController extends ListController {
    setup() {
        super.setup();
        this.action = useService("action");
    }

    openSalesView() {
        console.log("Opening sales view");
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sales",
            res_model: "sale.order",
            views: [[false, "list", [false, "form"]]]
        });
    }

    openInvoiceView() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Invoices",
            res_model: "account.move",
            views: [[false, "list"], [false, "form"]]
        });
    }
}

export const resPartnerListView = {
    // Replace the listView controller with the new one
    // Include the added buttons
    ...listView,
    Controller: ResPartnerListController,
    buttonTemplate:"owl.ResPartnerListView.Buttons"
}

registry.category("views").add("res_partner_list_view", resPartnerListView)
