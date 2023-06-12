/** @odoo-module **/

import { registry } from "@web/core/registry";
import { kanbanView } from "@web/views/kanban/kanban_view";
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { useService } from "@web/core/utils/hooks";

const { onWillStart } = owl;

class ResPartnerKanbanController extends KanbanController {
    setup() {
        super.setup();
        this.action = useService("action");
        this.orm = useService("orm");

        onWillStart(async () => {
            // Retrieve the state_id field from all res.partner records, and group by state_id
            this.customerLocations = await this.orm.readGroup("res.partner", [], ['state_id'], ['state_id']);
            // There's probably a more efficient way of doing this...
            const partners = await this.orm.searchRead("res.partner", [], []);
            this.numPartners = partners.length;
        })
    }

    openSalesView() {
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

    selectLocations(state) {
        const id = state[0];
        const name = state[1];

        this.env.searchModel.setDomainParts({
            state: {
                domain: [['state_id', '=', id]],
                facetlabel: name
            }
        })
    }

    resetLocations() {
        console.log(this.env.searchModel)
        this.env.searchModel.setDomainParts({
            state: {
                domain: []
            }
        })
    }
}
ResPartnerKanbanController.template = "owl.ResPartnerKanbanView";

export const resPartnerKanbanView = {
    // Replace the kanbanView controller with the new one
    // Include the added buttons
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate:"owl.ResPartnerKanbanView.Buttons"
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView)
