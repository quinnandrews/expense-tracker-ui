import React from 'react';
import CategoriesListPanel from "../CategoriesListPanel/CategoriesListPanel";
import CategoriesEditPanel from "../CategoriesEditPanel/CategoriesEditPanel";
import CategoriesHelpPanel from "../CategoriesHelpPanel/CategoriesHelpPanel";
import PropTypes from "prop-types";
import TabPanel from "../../../Common/TabPanel/TabPanel";

class CategoriesTabPanel extends TabPanel {

    constructor(props) {
        super(props);
        this.state = {
            categoryList: [
                {
                    id: 1,
                    name: "Beer"
                },
                {
                    id: 2,
                    name: "Food"
                },
                {
                    id: 3,
                    name: "Restaurants"
                }
            ]
        };
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PROPERTIES */

    getObjectList() {
        return this.state.categoryList;
    }

    setObjectList(list) {
        this.setState({categoryList: list});
    }

    renderListPanel() {
        return (
            <CategoriesListPanel tabPanelRef={this}
                                 editPanelRef={this.editPanelRef}
                                 ref={this.listPanelRef}/>
        );
    }

    renderEditPanel() {
        return (
            <CategoriesEditPanel idParam={this.props.idParam}
                                 tabPanelRef={this}
                                 listPanelRef={this.listPanelRef}
                                 ref={this.editPanelRef}/>
        );
    }

    renderHelpPanel() {
        return (
            <CategoriesHelpPanel/>
        );
    }

}

CategoriesTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default CategoriesTabPanel;
