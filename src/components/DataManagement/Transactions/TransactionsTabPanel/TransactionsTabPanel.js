import React, {Component} from 'react';
import TransactionsHelpPanel from "../TransactionsHelpPanel/TransactionsHelpPanel";
import TransactionsEditPanel from "../TransactionsEditPanel/TransactionsEditPanel";
import TransactionsListPanel from "../TransactionsListPanel/TransactionsListPanel";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const defaultEditStateMessage = 'Creating New Transaction';

class TransactionsTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionIdSequence: 3,
            selectedTab: listTab,
            listStateMessage: null,
            editStateMessage: defaultEditStateMessage,
            editFormIsDisabled: false,
            transactionId: 0,
            transactionDate: Date.now(),
            transactionMerchantId: 0,
            transactionList: [
                {
                    id: 1,
                    date: "2018-09-05",
                    merchant: {
                        id: 1,
                        name: "New Seasons"
                    }
                },
                {
                    id: 2,
                    date: "2018-09-06",
                    merchant: {
                        id: 2,
                        name: "People's Co-op"
                    }
                },
                {
                    id: 3,
                    date: "2018-09-07",
                    merchant: {
                        id: 1,
                        name: "New Seasons"
                    }
                }
            ],
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
            message = 'Found ' + this.getTransactionList().length + ' Transactions';
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

    isTransactionTransient() {
        return this.getTransactionId() === 0 || this.getTransactionId() === null || this.getTransactionId() === '';
    }

    getTransactionId() {
        return this.state.transactionId;
    }

    setTransactionId(id) {
        this.setState({transactionId: id});
    }

    getTransactionDate() {
        return this.state.transactionDate;
    }

    setTransactionDate(name) {
        this.setState({transactionDate: name});
    }

    getTransactionMerchantId() {
        return this.state.transactionMerchantId;
    }

    setTransactionMerchantId(id) {
        this.setState({transactionMerchantId: id});
    }

    getTransactionList() {
        return this.state.transactionList;
    }

    setTransactionList(list) {
        this.setState({transactionList: list});
    }

    getMerchantList() {
        return this.state.merchantList;
    }

    setMerchantList(list) {
        this.setState({transactionList: list});
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTION METHODS */

    save = () => {
        console.log("save");
        let transaction = null;
        if (this.state.transactionId !== 0) {
            // persistent object - update
            transaction = this.getTransactionList().find(t => t.id == this.state.transactionId);
            transaction.id = this.getTransactionId();
            transaction.date = this.getTransactionDate();
            transaction.merchant = this.getMerchantList().find(m => m.id == this.state.transactionMerchantId);
        } else {
            // transient object - insert
            transaction = {
                id: null,
                date: null,
                merchant: {
                    id: null,
                    name: null
                }
            };
            const newTransactionId = ++this.state.transactionIdSequence;
            this.setTransactionId(newTransactionId);
            transaction.id = newTransactionId;
            transaction.date = this.getTransactionDate();
            transaction.merchant = this.getMerchantList().find(m => m.id == this.state.transactionMerchantId);
            this.getTransactionList().push(transaction);
        }
        console.log(transaction);
        this.setEditStateMessage('Saved Transaction #' + transaction.id);
        this.setIsEditFormDisabled(true);
    };

    edit = () => {
        console.log("edit");
        if (!this.isTransactionTransient()) {
            const transaction = this.getTransactionList().find(t => t.id == this.getTransactionId());
            this.setTransactionId(transaction.id);
            this.setTransactionDate(transaction.date);
            this.setTransactionMerchantId(transaction.merchant.id);
            this.setEditStateMessage('Editing Transaction #' + transaction.id);
            this.setIsEditFormDisabled(false);
        }
    };

    clone = () => {
        console.log("clone");
        if (!this.isTransactionTransient()) {
            this.setTransactionId(0);
            this.setTransactionDate(Date.now());
            this.setEditStateMessage('Creating New Transaction From Clone');
            this.setIsEditFormDisabled(false);
        }
    };

    create = () => {
        console.log("create");
        this.setTransactionId(0);
        this.setTransactionDate(Date.now());
        this.setTransactionMerchantId(0);
        this.setEditStateMessage('Creating New Transaction');
        this.setIsEditFormDisabled(false);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isTransactionTransient()) {
            this.edit();
            this.setEditStateMessage('Reverted to Saved Version of Transaction #' + this.getTransactionId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Transaction');
        }
    };

    delete = () => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        if (!this.isTransactionTransient()) {
            const transactions = [...this.getTransactionList()];
            const transaction = transactions.find(t => t.id == this.getTransactionId());
            const index = transactions.indexOf(transaction);
            const deletedTransaction = transactions.splice(index, 1);
            this.setTransactionList(transactions);
            this.create();
            this.setEditStateMessage('Deleted Transaction #' + deletedTransaction[0].id);
            this.setIsEditFormDisabled(true);
        }
    };

    editFromList = (transaction) => {
        console.log("editFromList");
        this.setTransactionId(transaction.id);
        this.setTransactionDate(transaction.date);
        this.setTransactionMerchantId(transaction.merchant.id);
        this.setEditStateMessage('Editing Transaction #' + transaction.id);
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    cloneFromList = (transaction) => {
        console.log("cloneFromList");
        this.setTransactionId(0);
        this.setTransactionDate(Date.now());
        this.setTransactionMerchantId(transaction.merchant.id);
        this.setEditStateMessage('Creating New Transaction From Clone');
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    deleteFromList = (index) => {
        console.log("deleteFromList");
        // TODO: check if any associated Transactions exist
        const transactions = [...this.getTransactionList()];
        const deletedTransaction = transactions.splice(index, 1);
        this.setTransactionList(transactions);
        this.setListStateMessage('Deleted Transaction #' + deletedTransaction[0].id);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    transactionDateChanged(event) {
        this.setTransactionDate(event.target.value);
    };

    transactionMerchantChanged(event) {
        this.setTransactionMerchantId(event.target.value);
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
                           href="#list"
                           role="tab"
                           aria-controls="list"
                           aria-selected="true"
                           onClick={() => this.setSelectedTab(listTab)}>FIND</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(editTab)}
                           id="editor-tab"
                           data-toggle="tab"
                           href="#editor"
                           role="tab"
                           aria-controls="editor"
                           aria-selected="false"
                           onClick={() => this.setSelectedTab(editTab)}>EDIT</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(helpTab)}
                           id="guide-tab"
                           data-toggle="tab"
                           href="#guide"
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
                        <TransactionsListPanel listStateMessage={this.getListStateMessage()}
                                               transactionList={this.getTransactionList()}
                                               editAction={this.editFromList}
                                               cloneAction={this.cloneFromList}
                                               deleteAction={this.deleteFromList}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(editTab)}
                         id="editor"
                         role="tabpanel"
                         aria-labelledby="editor-tab">
                        <TransactionsEditPanel editStateMessage={this.getEditStateMessage()}
                                               isEditFormDisabled={this.isEditFormDisabled()}
                                               isTransactionTransient={this.isTransactionTransient()}
                                               transactionId={this.getTransactionId()}
                                               transactionDate={this.getTransactionDate()}
                                               transactionMerchantId={this.getTransactionMerchantId()}
                                               merchantList={this.getMerchantList()}
                                               saveAction={this.save}
                                               editAction={this.edit}
                                               cloneAction={this.clone}
                                               createAction={this.create}
                                               revertAction={this.revert}
                                               deleteAction={this.delete}
                                               transactionDateChangeHandler={(event) => this.transactionDateChanged(event)}
                                               transactionMerchantChangeHandler={(event) => this.transactionMerchantChanged(event)}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(helpTab)}
                         id="guide"
                         role="tabpanel"
                         aria-labelledby="guide-tab">
                        <TransactionsHelpPanel/>
                    </div>
                </div>
            </div>
        );
    }

}

export default TransactionsTabPanel;
