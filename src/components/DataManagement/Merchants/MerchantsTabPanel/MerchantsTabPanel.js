import React, {Component} from 'react';
import MerchantsHelpPanel from "../MerchantsHelpPanel/MerchantsHelpPanel";
import MerchantsEditPanel from "../MerchantsEditPanel/MerchantsEditPanel";
import MerchantsListPanel from "../MerchantsListPanel/MerchantsListPanel";
import PropTypes from "prop-types";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const editTabCreateLabel = 'CREATE';
const editTabEditLabel = 'EDIT';

class MerchantsTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSequence: 3,
            selectedTab: null,
            editTabLabel: null,
            listStateMessage: null,
            editStateMessage: null,
            editFormIsDisabled: false,
            merchantId: 0,
            merchantName: '',
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

    isEditFormDisabled() {
        return this.state.editFormIsDisabled;
    }

    setIsEditFormDisabled(isDisabled) {
        this.setState({editFormIsDisabled: isDisabled});
    };

    getListStateMessage() {
        let message = this.state.listStateMessage;
        if (message === null) {
            message = 'Found ' + this.getMerchantList().length + ' Merchants';
        }
        return message;
    }

    setListStateMessage(message) {
        this.setState({listStateMessage: message});
    }

    getEditStateMessage() {
        return this.state.editStateMessage;
    }

    setEditStateMessage(message) {
        this.setState({editStateMessage: message});
    }

    isMerchantTransient() {
        return this.getMerchantId() === 0 || this.getMerchantId() === null || this.getMerchantId() === '';
    }

    getMerchantId() {
        return this.state.merchantId;
    }

    setMerchantId(id) {
        this.setState({merchantId: id});
    }

    getMerchantName() {
        return this.state.merchantName;
    }

    setMerchantName(name) {
        this.setState({merchantName: name});
    }

    getMerchantList() {
        return this.state.merchantList;
    }

    setMerchantList(list) {
        this.setState({merchantList: list});
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTION METHODS */

    save = () => {
        console.log("save");
        let merchant = null;
        if (!this.isMerchantTransient()) {
            // persistent object - update
            merchant = this.getMerchantList().find(c => c.id == this.getMerchantId());
            merchant.id = this.getMerchantId();
            merchant.name = this.getMerchantName();
        } else {
            // transient object - insert
            merchant = {
                id: null,
                name: null
            };
            const newMerchantId = ++this.state.idSequence;
            this.setMerchantId(newMerchantId);
            merchant.id = newMerchantId;
            merchant.name = this.getMerchantName();
            this.getMerchantList().push(merchant);
        }
        console.log(merchant);
        this.setEditStateMessage('Saved Merchant #' + merchant.id);
        this.setIsEditFormDisabled(true);
        this.setEditTabLabel(editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const merchant = this.getMerchantList().find(c => c.id == id);
        if (merchant !== undefined) {
            this.setMerchantId(merchant.id);
            this.setMerchantName(merchant.name);
            this.setEditStateMessage('Editing Merchant #' + merchant.id);
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabEditLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    clone = (id) => {
        console.log("clone");
        const merchant = this.getMerchantList().find(c => c.id == id);
        if (merchant !== undefined) {
            const cloneName = 'COPY OF ' + merchant.name;
            this.setMerchantId(0);
            this.setMerchantName(cloneName);
            this.setEditStateMessage('Creating New Merchant From Clone');
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabCreateLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setMerchantId(0);
        this.setMerchantName('');
        this.setEditStateMessage('Creating New Merchant');
        this.setIsEditFormDisabled(false);
        this.setEditTabLabel(editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isMerchantTransient()) {
            this.edit(this.getMerchantId());
            this.setEditStateMessage('Reverted to Saved Version of Merchant #' + this.getMerchantId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Merchant');
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const merchants = [...this.getMerchantList()];
        const merchant = merchants.find(c => c.id == id);
        if (merchant !== undefined) {
            // remove the item from the list
            const index = merchants.indexOf(merchant);
            const deletedMerchant = merchants.splice(index, 1);
            this.setMerchantList(merchants);
            this.setListStateMessage('Deleted Merchant #' + deletedMerchant[0].id);
            if (merchant.id === this.getMerchantId()) {
                // the merchant is loaded in the editor
                // reset merchantId to mark as transient, but leave other values for user reference
                this.setMerchantId(0);
                this.setEditStateMessage('Deleted Merchant #' + deletedMerchant[0].id);
                this.setIsEditFormDisabled(true);
            }
        }
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    merchantNameChanged(event) {
        this.setMerchantName(event.target.value);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LIFECYCLE METHODS */

    componentWillMount() {
        const idParam = this.props.idParam;
        if (idParam !== undefined) {
            this.edit(Number.parseInt(idParam));
        } else {
            this.create();
        }
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <div>
                {/*TABS*/}
                <ul className="nav nav-tabs mb-3"
                    role="tablist">
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(listTab)}
                           id="list-tab"
                           data-toggle="tab"
                           href="#"
                           role="tab"
                           aria-controls="list"
                           aria-selected="true"
                           onClick={() => this.setSelectedTab(listTab)}>FIND</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(editTab)}
                           id="editor-tab"
                           data-toggle="tab"
                           href="#"
                           role="tab"
                           aria-controls="editor"
                           aria-selected="false"
                           onClick={() => this.setSelectedTab(editTab)}>{this.getEditTabLabel()}</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(helpTab)}
                           id="guide-tab"
                           data-toggle="tab"
                           href="#"
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
                        <MerchantsListPanel listStateMessage={this.getListStateMessage()}
                                            merchantList={this.getMerchantList()}
                                            editAction={this.edit}
                                            cloneAction={this.clone}
                                            deleteAction={this.delete}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(editTab)}
                         id="editor"
                         role="tabpanel"
                         aria-labelledby="editor-tab">
                        <MerchantsEditPanel editStateMessage={this.getEditStateMessage()}
                                            isEditFormDisabled={this.isEditFormDisabled()}
                                            isMerchantTransient={this.isMerchantTransient()}
                                            merchantId={this.getMerchantId()}
                                            merchantName={this.getMerchantName()}
                                            saveAction={this.save}
                                            editAction={this.edit}
                                            cloneAction={this.clone}
                                            createAction={this.create}
                                            revertAction={this.revert}
                                            deleteAction={this.delete}
                                            merchantNameChangeHandler={(event) => this.merchantNameChanged(event)}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(helpTab)}
                         id="guide"
                         role="tabpanel"
                         aria-labelledby="guide-tab">
                        <MerchantsHelpPanel/>
                    </div>
                </div>
            </div>
        );
    }

}

MerchantsTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default MerchantsTabPanel;
