import React from "react";
import PropTypes from 'prop-types';
import ListPanel from "../../../Common/ListPanel/ListPanel";

class ItemsListPanel extends ListPanel {

    getListObjectLabel() {
        return "Items";
    }

    getColumnLabels() {
        return ["ID", "Name", "Category", "Actions"];
    }

    renderRows() {
        return (
            this.getList().map((item) => {
                return(
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{(this.getTabPanel().getCategoryList().find(c => c.id === item.categoryId)).name}</td>
                        {this.renderStandardActionsCell(item.id)}
                    </tr>
                );
            })
        );
    }

}

ItemsListPanel.propTypes = {
    tabPanelRef: PropTypes.object,
    editPanelRef: PropTypes.object
};

export default ItemsListPanel;