import React from "react";
import PropTypes from 'prop-types';
import ListPanel from "../../../Common/ListPanel/ListPanel";

class MerchantsListPanel extends ListPanel {

    getListObjectLabel() {
        return "Merchants";
    }

    getColumnLabels() {
        return ["ID", "Name", "Actions"];
    }

    renderRows() {
        return (
            this.getList().map((merchant) => {
                return(
                    <tr key={merchant.id}>
                        <th scope="row">{merchant.id}</th>
                        <td>{merchant.name}</td>
                        {this.renderStandardActionsCell(merchant.id)}
                    </tr>
                );
            })
        );
    }

}

MerchantsListPanel.propTypes = {
    tabPanelRef: PropTypes.object,
    editPanelRef: PropTypes.object
};

export default MerchantsListPanel;