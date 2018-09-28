import React, {Component} from 'react';
import MerchantsHelpPanel from "../MerchantsHelpPanel/MerchantsHelpPanel";
import MerchantsEditPanel from "../MerchantsEditPanel/MerchantsEditPanel";
import MerchantsListPanel from "../MerchantsListPanel/MerchantsListPanel";
import PropTypes from "prop-types";
import Wrapper from "../../../Common/Wrapper/Wrapper";

export const listTab = 'listTab';
export const editTab = 'editTab';
export const helpTab = 'helpTab';

export const editTabCreateLabel = 'CREATE';
export const editTabEditLabel = 'EDIT';

class MerchantsTabPanel extends Component {

    listPanelRef;
    editPanelRef;

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: null,
            editTabLabel: null,
            merchantList: [
                {
                    id: 1,
                    name: "New Seasons"
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
        this.listPanelRef = React.createRef();
        this.editPanelRef = React.createRef();
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PROPERTIES */

    isTabSelected(tab) {
        return this.getSelectedTab() === tab;
    }

    getSelectedTab() {
        let tab = this.state.selectedTab;
        if (tab === null) {
            tab = listTab;
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
            label = editTabEditLabel;
        }
        return label;
    }

    setEditTabLabel(label) {
        this.setState({editTabLabel: label});
    }

    getMerchantList() {
        return this.state.merchantList;
    }

    setMerchantList(list) {
        this.setState({merchantList: list});
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <Wrapper>
                {/*TABS*/}
                <ul className="nav nav-tabs mb-3"
                    role="tablist">
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(listTab)}
                           id="list-tab"
                           data-toggle="tab"
                           href=""
                           role="tab"
                           aria-controls="list"
                           aria-selected="true"
                           onClick={() => this.setSelectedTab(listTab)}>FIND</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(editTab)}
                           id="editor-tab"
                           data-toggle="tab"
                           href=""
                           role="tab"
                           aria-controls="editor"
                           aria-selected="false"
                           onClick={() => this.setSelectedTab(editTab)}>{this.getEditTabLabel()}</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(helpTab)}
                           id="guide-tab"
                           data-toggle="tab"
                           href=""
                           role="tab"
                           aria-controls="guide"
                           aria-selected="false"
                           onClick={() => this.setSelectedTab(helpTab)}>HELP</a>
                    </li>
                </ul>
                {/*TAB PANES*/}
                <div className="tab-content">
                    <div className={this.getSelectedTabPaneClassName(listTab)}
                         id="list"
                         role="tabpanel"
                         aria-labelledby="list-tab">
                        <MerchantsListPanel tabPanelRef={this}
                                            editPanelRef={this.editPanelRef}
                                            ref={this.listPanelRef}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(editTab)}
                         id="editor"
                         role="tabpanel"
                         aria-labelledby="editor-tab">
                        <MerchantsEditPanel idParam={this.props.idParam}
                                            tabPanelRef={this}
                                            listPanelRef={this.listPanelRef}
                                            ref={this.editPanelRef}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(helpTab)}
                         id="guide"
                         role="tabpanel"
                         aria-labelledby="guide-tab">
                        <MerchantsHelpPanel/>
                    </div>
                </div>
            </Wrapper>
        );
    }

}

MerchantsTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default MerchantsTabPanel;
