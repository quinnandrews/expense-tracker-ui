import React, {Component} from 'react';
import TransactionsHelpPanel from "../TransactionsHelpPanel/TransactionsHelpPanel";
import TransactionsEditPanel from "../TransactionsEditPanel/TransactionsEditPanel";
import TransactionsListPanel from "../TransactionsListPanel/TransactionsListPanel";
import PropTypes from "prop-types";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const editTabCreateLabel = 'CREATE';
const editTabEditLabel = 'EDIT';

class TransactionsTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionIdSequence: 3,
            selectedTab: null,
            editTabLabel: null,
            listStateMessage: null,
            editStateMessage: null,
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
        if (!this.isTransactionTransient()) {
            // persistent object - update
            transaction = this.getTransactionList().find(t => t.id == this.getTransactionId());
            transaction.id = this.getTransactionId();
            transaction.date = this.getTransactionDate();
            transaction.merchant = this.getMerchantList().find(m => m.id == this.getTransactionMerchantId());
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
            transaction.merchant = this.getMerchantList().find(m => m.id == this.getTransactionMerchantId());
            this.getTransactionList().push(transaction);
        }
        console.log(transaction);
        this.setEditStateMessage('Saved Transaction #' + transaction.id);
        this.setIsEditFormDisabled(true);
        this.setEditTabLabel(editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const transaction = this.getTransactionList().find(t => t.id == id);
        if (transaction !== undefined) {
            this.setTransactionId(transaction.id);
            this.setTransactionDate(transaction.date);
            this.setTransactionMerchantId(transaction.merchant.id);
            this.setEditStateMessage('Editing Transaction #' + transaction.id);
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabEditLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }

    };

    clone = (id) => {
        console.log("clone");
        const transaction = this.getTransactionList().find(t => t.id == id);
        if (transaction !== undefined) {
            this.setTransactionId(0);
            this.setTransactionDate(Date.now());
            this.setTransactionMerchantId(transaction.merchant.id);
            this.setEditStateMessage('Creating New Transaction From Clone');
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabCreateLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setTransactionId(0);
        this.setTransactionDate(Date.now());
        this.setTransactionMerchantId(0);
        this.setEditStateMessage('Creating New Transaction');
        this.setIsEditFormDisabled(false);
        this.setEditTabLabel(editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isTransactionTransient()) {
            this.edit(this.getTransactionId());
            this.setEditStateMessage('Reverted to Saved Version of Transaction #' + this.getTransactionId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Transaction');
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const transactions = [...this.getTransactionList()];
        const transaction = transactions.find(t => t.id == id);
        if (transaction !== undefined) {
            // remove the transaction from the list
            const index = transactions.indexOf(transaction);
            const deletedTransaction = transactions.splice(index, 1);
            this.setTransactionList(transactions);
            if (transaction.id === this.getTransactionId()) {
                // the transaction is loaded in the editor
                // reset transactionId to mark as transient, but leave other values for user reference
                this.setTransactionId(0);
                this.setEditStateMessage('Deleted Transaction #' + deletedTransaction[0].id);
                this.setIsEditFormDisabled(true);
            }
        } else {
            // TODO - Report Not Found Error
        }
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    transactionDateChanged(event) {
        this.setTransactionDate(event.target.value);
    };

    transactionMerchantChanged(event) {
        this.setTransactionMerchantId(event.target.value);
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
                        <TransactionsListPanel listStateMessage={this.getListStateMessage()}
                                               transactionList={this.getTransactionList()}
                                               editAction={this.edit}
                                               cloneAction={this.clone}
                                               deleteAction={this.delete}/>
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

TransactionsTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default TransactionsTabPanel;
