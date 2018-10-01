import React from 'react';
import ItemsHelpPanel from "../ItemsHelpPanel/ItemsHelpPanel";
import ItemsListPanel from "../ItemsListPanel/ItemsListPanel";
import ItemsEditPanel from "../ItemsEditPanel/ItemsEditPanel";
import PropTypes from "prop-types";
import TabPanel from "../../../Common/TabPanel/TabPanel";

class ItemsTabPanel extends TabPanel {

    // TODO - fix the annoying issue with Strings (e.g. convert to integer when selected from dropdown) - use converter

    constructor(props) {
        super(props);
        this.state = {
            itemList: [
                {
                    id: 1,
                    name: "Pilsner Urquell - 4pk 0.5L Cans",
                    categoryId: "1"
                },
                {
                    id: 2,
                    name: "Oly Kraut Original Sauerkraut",
                    categoryId: "2"
                },
                {
                    id: 3,
                    name: "Chocolove Chocolate Bar",
                    categoryId: "2"
                }
            ],
            categoryList: [
                {
                    id: "1",
                    name: "Beer"
                },
                {
                    id: "2",
                    name: "Food"
                }
            ]
        };
    }

    getCategoryList() {
        return this.state.categoryList;
    }

    setCategoryList(list) {
        this.setState({categoryList: list});
    }

    getObjectList() {
        return this.state.itemList;
    }

    setObjectList(list) {
        this.setState({itemList: list});
    }

    renderListPanel() {
        return (
            <ItemsListPanel tabPanelRef={this}
                            editPanelRef={this.editPanelRef}
                            ref={this.listPanelRef}/>
        );
    }

    renderEditPanel() {
        return (
            <ItemsEditPanel idParam={this.props.idParam}
                            tabPanelRef={this}
                            listPanelRef={this.listPanelRef}
                            ref={this.editPanelRef}/>
        );
    }

    renderHelpPanel() {
        return (
            <ItemsHelpPanel/>
        );
    }

}

ItemsTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default ItemsTabPanel;
