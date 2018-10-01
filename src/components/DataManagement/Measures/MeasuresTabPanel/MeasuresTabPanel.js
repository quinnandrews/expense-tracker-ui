import React from 'react';
import MeasuresHelpPanel from "../MeasuresHelpPanel/MeasuresHelpPanel";
import MeasuresEditPanel from "../MeasuresEditPanel/MeasuresEditPanel";
import MeasuresListPanel from "../MeasuresListPanel/MeasuresListPanel";
import PropTypes from "prop-types";
import TabPanel from "../../../Common/TabPanel/TabPanel";

class MeasuresTabPanel extends TabPanel {

    constructor(props) {
        super(props);
        this.state = {
            measureList: [
                {
                    id: 1,
                    name: "Units",
                    symbol: "UN"
                },
                {
                    id: 2,
                    name: "Pounds",
                    symbol: "LB"
                },
                {
                    id: 3,
                    name: "Ounces",
                    symbol: "OZ"
                }
            ]
        };
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PROPERTIES */

    getObjectList() {
        return this.state.measureList;
    }

    setObjectList(list) {
        this.setState({measureList: list});
    }

    renderListPanel() {
        return (
            <MeasuresListPanel tabPanelRef={this}
                               editPanelRef={this.editPanelRef}
                               ref={this.listPanelRef}/>
        );
    }

    renderEditPanel() {
        return (
            <MeasuresEditPanel idParam={this.props.idParam}
                               tabPanelRef={this}
                               listPanelRef={this.listPanelRef}
                               ref={this.editPanelRef}/>
        );
    }

    renderHelpPanel() {
        return (
            <MeasuresHelpPanel/>
        );
    }

}

MeasuresTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default MeasuresTabPanel;
