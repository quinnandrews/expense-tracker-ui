import React from "react";
import PropTypes from 'prop-types';
import ListPanel from "../../../Common/ListPanel/ListPanel";

class MeasuresListPanel extends ListPanel {

    getListObjectLabel() {
        return "Merchants";
    }

    getColumnLabels() {
        return ["ID", "Name", "Symbol", "Actions"];
    }

    renderRows() {
        return (
            this.getList().map((measure) => {
                return(
                    <tr key={measure.id}>
                        <th scope="row">{measure.id}</th>
                        <td>{measure.name}</td>
                        <td>{measure.symbol}</td>
                        {this.renderStandardActionsCell(measure.id)}
                    </tr>
                );
            })
        );
    }

}

MeasuresListPanel.propTypes = {
    tabPanelRef: PropTypes.object,
    editPanelRef: PropTypes.object
};

export default MeasuresListPanel;