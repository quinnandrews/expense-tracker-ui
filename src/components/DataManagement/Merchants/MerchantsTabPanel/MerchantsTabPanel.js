import React from 'react';
import MerchantsHelpPanel from "../MerchantsHelpPanel/MerchantsHelpPanel";
import MerchantsEditPanel from "../MerchantsEditPanel/MerchantsEditPanel";
import MerchantsListPanel from "../MerchantsListPanel/MerchantsListPanel";
import PropTypes from "prop-types";
import TabPanel from "../../../Common/TabPanel/TabPanel";

class MerchantsTabPanel extends TabPanel {

    constructor(props) {
        super(props);
        this.state = {
            merchantList: [
                {
                    id: 1,
                    name: "New Seasons",
                    relative: {
                        id: 9
                    }
                },
                {
                    id: 2,
                    name: "People's Co-Op"
                },
                {
                    id: 3,
                    name: "Meat, Cheese, Bread"
                }
            ]
        };
    }

    getObjectList() {
        return this.state.merchantList;
    }

    setObjectList(list) {
        this.setState({merchantList: list});
    }

    renderListPanel() {
        return (
            <MerchantsListPanel tabPanelRef={this}
                                editPanelRef={this.editPanelRef}
                                ref={this.listPanelRef}/>
        );
    }

    renderEditPanel() {
        return (
            <MerchantsEditPanel idParam={this.props.idParam}
                                tabPanelRef={this}
                                listPanelRef={this.listPanelRef}
                                ref={this.editPanelRef}/>
        );
    }

    renderHelpPanel() {
        return (
            <MerchantsHelpPanel/>
        );
    }

}

MerchantsTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default MerchantsTabPanel;
