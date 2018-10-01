import React, {Component} from 'react';
import Wrapper from "../../Common/Wrapper/Wrapper";
import Tab from "../../Common/Tab/Tab"
import TabNav from "../../Common/TabNav/TabNav";
import TabContent from "../../Common/TabContent/TabContent";
import TabPane from "../../Common/TabPane/TabPane";
import * as Constants from "../../../constants/Constants";

class TabPanel extends Component {

    listPanelRef;
    editPanelRef;

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: null,
            editTabLabel: null
        };
        this.listPanelRef = React.createRef();
        this.editPanelRef = React.createRef();
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PROPERTIES */

    isTabSelected(tab) {
        return this.getSelectedTab() === tab;
    }

    getSelectedTab() {
        let tab = this.state.selectedTab;
        if (tab === null || tab === undefined) {
            tab = Constants.listTab;
        }
        return tab;
    }

    setSelectedTab(tab) {
        this.setState({selectedTab: tab});
    };

    getSelectedTabClassName(tab) {
        return this.isTabSelected(tab) ? 'nav-link active' : 'nav-link';
    }

    getSelectedTabPaneClassName(tab) {
        return this.isTabSelected(tab) ? 'tab-pane fade show active' : 'tab-pane fade';
    }

    getEditTabLabel() {
        let label = this.state.editTabLabel;
        if (label === null) {
            label = Constants.editTabEditLabel;
        }
        return label;
    }

    setEditTabLabel(label) {
        this.setState({editTabLabel: label});
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <Wrapper>
                <TabNav>
                    <Tab id={Constants.listTab}
                         controlsId={Constants.listTabPane}
                         className={this.getSelectedTabClassName(Constants.listTab)}
                         label={Constants.listTabLabel}
                         clickListener={() => this.setSelectedTab(Constants.listTab)}/>
                    <Tab id={Constants.editTab}
                         controlsId={Constants.editTabPane}
                         className={this.getSelectedTabClassName(Constants.editTab)}
                         label={this.getEditTabLabel()}
                         clickListener={() => this.setSelectedTab(Constants.editTab)}/>
                    <Tab id={Constants.helpTab}
                         controlsId={Constants.helpTabPane}
                         className={this.getSelectedTabClassName(Constants.helpTab)}
                         label={Constants.helpTabLabel}
                         clickListener={() => this.setSelectedTab(Constants.helpTab)}/>
                </TabNav>
                <TabContent>
                    <TabPane id={Constants.listTabPane}
                             controlledById={Constants.listTab}
                             className={this.getSelectedTabPaneClassName(Constants.listTab)}>
                        {this.renderListPanel()}
                    </TabPane>
                    <TabPane id={Constants.editTabPane}
                             controlledById={Constants.editTab}
                             className={this.getSelectedTabPaneClassName(Constants.editTab)}>
                        {this.renderEditPanel()}
                    </TabPane>
                    <TabPane id={Constants.helpTabPane}
                             controlledById={Constants.helpTab}
                             className={this.getSelectedTabPaneClassName(Constants.helpTab)}>
                        {this.renderHelpPanel()}
                    </TabPane>
                </TabContent>
            </Wrapper>
        );
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PSEUDO ABSTRACT METHODS */

    renderListPanel() {}

    renderEditPanel() {}

    renderHelpPanel() {}

}

export default TabPanel;
