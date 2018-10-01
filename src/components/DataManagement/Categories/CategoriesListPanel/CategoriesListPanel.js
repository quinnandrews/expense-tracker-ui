import React from "react";
import PropTypes from 'prop-types';
import ListPanel from "../../../Common/ListPanel/ListPanel";

class CategoriesListPanel extends ListPanel {

    getListObjectLabel() {
        return "Categories";
    }

    getColumnLabels() {
        return ["ID", "Name", "Actions"];
    }

    renderRows() {
        return (
            this.getList().map((category) => {
                return(
                    <tr key={category.id}>
                        <th scope="row">{category.id}</th>
                        <td>{category.name}</td>
                        {this.renderStandardActionsCell(category.id)}
                    </tr>
                );
            })
        );
    }

}

CategoriesListPanel.propTypes = {
    tabPanelRef: PropTypes.object,
    editPanelRef: PropTypes.object
};

export default CategoriesListPanel;
