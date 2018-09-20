import React, {Component} from 'react';
import MerchantsHelpPanel from "../MerchantsHelpPanel/MerchantsHelpPanel";
import MerchantsEditPanel from "../MerchantsEditPanel/MerchantsEditPanel";
import MerchantsListPanel from "../MerchantsListPanel/MerchantsListPanel";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const defaultEditStateMessage = 'Creating New Merchant';

class MerchantsTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSequence: 3,
            selectedTab: listTab,
            listStateMessage: null,
            editStateMessage: defaultEditStateMessage,
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
        return this.state.selectedTab === tab;
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
        if (this.state.merchantId !== 0) {
            // persistent object - update
            merchant = this.getMerchantList().find(c => c.id == this.state.merchantId);
            merchant.id = this.getMerchantId();
            merchant.name = this.getMerchantName();
        } else {
            // transient object - insert
            merchant = {
                id: null,
                name: null
            }
            const newItemId = ++this.state.idSequence;
            this.setMerchantId(newItemId);
            merchant.id = newItemId;
            merchant.name = this.getMerchantName();
            this.getMerchantList().push(merchant);
        }
        console.log(merchant);
        this.setEditStateMessage('Saved Merchant #' + merchant.id);
        this.setIsEditFormDisabled(true);
    };

    edit = () => {
        console.log("edit");
        if (!this.isMerchantTransient()) {
            const merchant = this.getMerchantList().find(c => c.id == this.getMerchantId());
            this.setMerchantId(merchant.id);
            this.setMerchantName(merchant.name);
            this.setEditStateMessage('Editing Merchant #' + merchant.id);
            this.setIsEditFormDisabled(false);
        }
    };

    clone = () => {
        console.log("clone");
        if (!this.isMerchantTransient()) {
            const cloneName = 'COPY OF ' + this.getMerchantName();
            this.setMerchantId(0);
            this.setMerchantName(cloneName);
            this.setEditStateMessage('Creating New Merchant From Clone');
            this.setIsEditFormDisabled(false);
        }
    };

    create = () => {
        console.log("create");
        this.setMerchantId(0);
        this.setMerchantName('');
        this.setEditStateMessage('Creating New Merchant');
        this.setIsEditFormDisabled(false);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isMerchantTransient()) {
            this.edit();
            this.setEditStateMessage('Reverted to Saved Version of Merchant #' + this.getMerchantId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Merchant');
        }
    };

    delete = () => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        if (!this.isMerchantTransient()) {
            const categories = [...this.getMerchantList()];
            const merchant = categories.find(c => c.id == this.getMerchantId());
            const index = categories.indexOf(merchant);
            const deletedMerchant = categories.splice(index, 1);
            this.setMerchantList(categories);
            this.create();
            this.setEditStateMessage('Deleted Merchant #' + deletedMerchant[0].id);
            this.setIsEditFormDisabled(true);
        }
    };

    editFromList = (merchant) => {
        console.log("editFromList");
        this.setMerchantId(merchant.id);
        this.setMerchantName(merchant.name);
        this.setEditStateMessage('Editing Merchant #' + merchant.id);
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    cloneFromList = (merchant) => {
        console.log("cloneFromList");
        this.setMerchantId(0);
        this.setMerchantName('COPY OF ' + merchant.name);
        this.setEditStateMessage('Creating New Merchant From Clone');
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    deleteFromList = (index) => {
        console.log("deleteFromList");
        // TODO: check if any associated Transactions exist
        const categories = [...this.getMerchantList()];
        const deletedMerchant = categories.splice(index, 1);
        this.setMerchantList(categories);
        this.setListStateMessage('Deleted Merchant #' + deletedMerchant[0].id);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    merchantNameChanged(event) {
        this.setMerchantName(event.target.value);
    };

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
                           onClick={() => this.setSelectedTab(editTab)}>EDIT</a>
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
                                            editAction={this.editFromList}
                                            cloneAction={this.cloneFromList}
                                            deleteAction={this.deleteFromList}/>
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

export default MerchantsTabPanel;
