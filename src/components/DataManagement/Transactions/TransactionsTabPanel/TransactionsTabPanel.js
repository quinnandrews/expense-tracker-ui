import React, {Component} from 'react';
import TransactionsHelpPanel from "../TransactionsHelpPanel/TransactionsHelpPanel";
import TransactionsEditPanel from "../TransactionsEditPanel/TransactionsEditPanel";
import TransactionsListPanel from "../TransactionsListPanel/TransactionsListPanel";
import PropTypes from "prop-types";
import moment from "moment";
import ItemsEditPanel from "../../Items/ItemsEditPanel/ItemsEditPanel";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const editTabCreateLabel = 'CREATE';
const editTabEditLabel = 'EDIT';

let transactionItemSequence = 0;

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
            transactionDate: undefined,
            transactionMerchantId: 0,
            transactionItemList: [],
            transactionItemCount: 0,
            transactionItemGrandTotal: 0,
            merchantName: '',
            showMerchantCreate: false,
            transactionList: [
                {
                    id: 1,
                    date: moment('2018-09-05').format('YYYY-MM-DDTHH:mm'),
                    merchant: {
                        id: 1,
                        name: "New Seasons"
                    },
                    transactionItems: []
                },
                {
                    id: 2,
                    date: moment('2018-09-06').format('YYYY-MM-DDTHH:mm'),
                    merchant: {
                        id: 2,
                        name: "People's Co-op"
                    },
                    transactionItems: []
                },
                {
                    id: 3,
                    date: moment('2018-09-07').format('YYYY-MM-DDTHH:mm'),
                    merchant: {
                        id: 1,
                        name: "New Seasons"
                    },
                    transactionItems: []
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
            ],
            itemList: [
                {
                    id: 1,
                    name: "Pilsner Urquell - 4pk 0.5L Cans",
                    category: {
                        id: 1,
                        name: "Beer"
                    }
                },
                {
                    id: 2,
                    name: "Oly Kraut Original Sauerkraut",
                    category: {
                        id: 2,
                        name: "Food"
                    }
                },
                {
                    id: 3,
                    name: "Chocolove Chocolate Bar",
                    category: {
                        id: 2,
                        name: "Food"
                    }
                }
            ],
            categoryList: [
                {
                    id: 1,
                    name: "Beer"
                },
                {
                    id: 2,
                    name: "Food"
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

    getMerchantName() {
        return this.state.merchantName;
    }

    setMerchantName(name) {
        this.setState({merchantName: name});
    }

    showMerchantCreate() {
        return this.state.showMerchantCreate;
    }

    setShowMerchantCreate(show) {
        this.setState({showMerchantCreate: show});
    }

    getTransactionItemList() {
        return this.state.transactionItemList;
    }

    setTransactionItemList(list) {
        this.setState({transactionItemList: list});
    }

    getTransactionItemCount() {
        return this.state.transactionItemCount;
    }

    setTransactionItemCount(count) {
        this.setState({transactionItemCount: count});
    }

    getTransactionItemGrandTotal() {
        return this.state.transactionItemGrandTotal;
    }

    setTransactionItemGrandTotal(total) {
        this.setState({transactionItemGrandTotal: total});
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
        this.setState({merchantList: list});
    }

    getItemList() {
        return this.state.itemList;
    }

    setItemList(list) {
        this.setState({itemList: list});
    }

    getCategoryList() {
        return this.state.categoryList;
    }

    setCategoryList(list) {
        this.setState({categoryList: list});
    }

    getCurrentDate() {
        return moment().format('YYYY-MM-DDTHH:mm');
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
            // iterate through transactionItems and persist, but with mock data here, we can just add all transactionItems
            transaction.transactionItems = this.getTransactionItemList();
        } else {
            // transient object - insert
            transaction = {
                id: null,
                date: null,
                merchant: {
                    id: null,
                    name: null
                },
                transactionItems: []
            };
            const newTransactionId = ++this.state.transactionIdSequence;
            this.setTransactionId(newTransactionId);
            transaction.id = newTransactionId;
            transaction.date = this.getTransactionDate();
            transaction.merchant = this.getMerchantList().find(m => m.id == this.getTransactionMerchantId());
            // iterate through transactionItems and persist, but with mock data here, we can just add all transactionItems
            transaction.transactionItems = this.getTransactionItemList();
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
            this.setTransactionItemList(transaction.transactionItems);
            this.calculateTransactionItemGrandTotals(transaction.transactionItems);
            this.setEditStateMessage('Editing Transaction #' + transaction.id);
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabEditLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
            this.create();
        }
    };

    clone = (id) => {
        console.log("clone");
        const transaction = this.getTransactionList().find(t => t.id == id);
        if (transaction !== undefined) {
            this.setTransactionId(0);
            this.setTransactionDate(this.getCurrentDate());
            this.setTransactionMerchantId(transaction.merchant.id);
            this.setTransactionItemList([]);
            this.setTransactionItemGrandTotal(0);
            this.setTransactionItemCount(0);
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
        this.setTransactionDate(this.getCurrentDate());
        this.setTransactionMerchantId(0);
        this.setTransactionItemList([]);
        this.setTransactionItemGrandTotal(0);
        this.setTransactionItemCount(0);
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
            this.setListStateMessage('Deleted Transactions #' + deletedTransaction[0].id);
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

    createTransactionItem = () => {
        console.log("createTransactionItem");
        const transactionItem = {
            key: ++transactionItemSequence,
            id: undefined,
            transactionId: undefined,
            itemId: undefined,
            itemName: '',
            showItemCreate: false,
            categoryId: undefined,
            categoryName: '',
            showCategoryCreate: false,
            measureId: 1,
            price: null,
            quantity: null,
            subTotal: undefined,
            itemCount: undefined
        };
        // put the new transactionItem on top of the list for user convenience
        this.setTransactionItemList([transactionItem, ...this.getTransactionItemList()]);
    };

    deleteTransactionItem = (index) => {
        console.log('deleteTransactionItem(' + index + ')');
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        if (transactionItem.id !== undefined) {
            // persistent object - delete from database
            console.log('persistent')
        } else {
            // transient object - just remove from the list
            console.log('transient')
        }
        const deletedTransactionItem = transactionItems.splice(index, 1);
        // TODO set some kind of message
        this.calculateTransactionItemGrandTotals(transactionItems);
        this.setTransactionItemList(transactionItems);
    };

    calculateTransactionItemSubTotals(transactionItem) {
        if (transactionItem.measureId !== undefined
            && transactionItem.measureId !== 0
            && transactionItem.quantity !== undefined
            && transactionItem.price !== undefined) {
            transactionItem.subTotal = (transactionItem.quantity * transactionItem.price);
            transactionItem.itemCount = (
                (transactionItem.measureId === 2 || transactionItem.measureId === 3)  ? 1 : transactionItem.quantity);
        }
    }

    calculateTransactionItemGrandTotals(transactionItems) {
        let transactionItemCount = 0;
        let transactionItemGrandTotal = 0;
        transactionItems.map((ti) => {
            if (ti.itemCount !== undefined) {
                transactionItemCount = (ti.itemCount * 1) + transactionItemCount;
            }
            if (ti.subTotal !== undefined) {
                transactionItemGrandTotal = ti.subTotal + transactionItemGrandTotal;
            }
        });
        this.setTransactionItemCount(transactionItemCount);
        this.setTransactionItemGrandTotal(transactionItemGrandTotal);
    }

    saveMerchant = () => {
        console.log("saveMerchant");
        const merchant = {
            id: this.getMerchantList().length + 1,
            name: this.getMerchantName()
        };
        const merchants = [...this.getMerchantList()];
        merchants.push(merchant);
        merchants.sort((a, b) => a.name.localeCompare(b.name));
        this.setMerchantList(merchants);
        this.setTransactionMerchantId(merchant.id);
        this.revertMerchantCreate();
    };

    createMerchant = () => {
        console.log("createMerchant");
        this.setMerchantName(null);
        this.setShowMerchantCreate(true);
    };

    revertMerchantCreate = () => {
        console.log("revertMerchantCreate");
        this.setMerchantName(null);
        this.setShowMerchantCreate(false);
    };

    saveItem = (index) => {
        console.log("saveItem");
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        const newId = this.getItemList().length + 1;
        let item = null;
        let category = null;
        if (transactionItem.categoryId !== 0) {
            // created item but selected category
            item = {
                id: newId,
                name: transactionItem.itemName,
                category: {
                    id: transactionItem.categoryId
                }
            };
        } else {
            // created item and created category
            category = {
                //id: this.getCategoryList().length + 1, No category list yet
                id: this.getCategoryList().length + 1,
                name: transactionItem.categoryName
            };
            const categories = [...this.getCategoryList()];
            categories.push(category);
            categories.sort((a, b) => a.name.localeCompare(b.name));
            this.setCategoryList(categories);
            item = {
                id: newId,
                name: transactionItem.itemName,
                category: {
                    id: category.id
                }
            };
        }
        const items = [...this.getItemList()];
        items.push(item);
        items.sort((a, b) => a.name.localeCompare(b.name));
        this.setItemList(items);
        transactionItem.itemId = item.id;
        this.revertItemCreate(index);
    };

    createItem = (index) => {
        console.log("createItem");
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.itemName = '';
        transactionItem.categoryId = 0;
        transactionItem.categoryName = '';
        transactionItem.showItemCreate = true;
        transactionItem.showCategoryCreate = false;
        this.setTransactionItemList(transactionItems);
    };

    createCategory = (index) => {
        console.log("createCategory");
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.showCategoryCreate = true;
        this.setTransactionItemList(transactionItems);
    };

    revertItemCreate = (index) => {
        console.log("revertItemCreate");
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.itemName = '';
        transactionItem.categoryId = 0;
        transactionItem.categoryName = '';
        transactionItem.showItemCreate = false;
        transactionItem.showCategoryCreate = false;
        this.setTransactionItemList(transactionItems);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    transactionDateChanged(event) {
        this.setTransactionDate(event.target.value);
    };

    transactionMerchantChanged(event) {
        this.setTransactionMerchantId(event.target.value);
    };

    merchantNameChanged = (event) => {
        this.setMerchantName(event.target.value);
    };

    transactionItemItemChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.itemId = event.target.value;
        this.setTransactionItemList(transactionItems);
    }

    itemNameChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.itemName = event.target.value;
        this.setTransactionItemList(transactionItems);
    }

    categoryChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.categoryId = Number.parseInt(event.target.value);
        this.setTransactionItemList(transactionItems);
    }

    categoryNameChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.categoryName = event.target.value;
        this.setTransactionItemList(transactionItems);
    }

    transactionItemMeasureChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.measureId = Number.parseInt(event.target.value);
        this.calculateTransactionItemSubTotals(transactionItem);
        this.calculateTransactionItemGrandTotals(transactionItems);
        this.setTransactionItemList(transactionItems);
    }

    transactionItemPriceChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.price = Number.parseFloat(event.target.value);
        this.calculateTransactionItemSubTotals(transactionItem);
        this.calculateTransactionItemGrandTotals(transactionItems);
        this.setTransactionItemList(transactionItems);
    }

    transactionItemQuantityChanged(event, index) {
        const transactionItems = [...this.getTransactionItemList()];
        const transactionItem = transactionItems[index];
        transactionItem.quantity = event.target.value;
        this.calculateTransactionItemSubTotals(transactionItem);
        this.calculateTransactionItemGrandTotals(transactionItems);
        this.setTransactionItemList(transactionItems);
    }

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
                <ul className="nav nav-tabs mb-3 pl-3 pr-3"
                    role="tablist">
                    <div className="tabs-container">
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
                    </div>
                </ul>
                {/*TAB PANES*/}
                <div className="tab-content pl-3 pr-3">
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
                                               transactionItemList={this.getTransactionItemList()}
                                               transactionItemCount={this.getTransactionItemCount()}
                                               transactionItemGrandTotal={this.getTransactionItemGrandTotal()}
                                               merchantName={this.getMerchantName()}
                                               showMerchantCreate={this.showMerchantCreate()}
                                               merchantList={this.getMerchantList()}
                                               itemList={this.getItemList()}
                                               categoryList={this.getCategoryList()}
                                               saveAction={this.save}
                                               editAction={this.edit}
                                               cloneAction={this.clone}
                                               createAction={this.create}
                                               revertAction={this.revert}
                                               deleteAction={this.delete}
                                               createTransactionItemAction={this.createTransactionItem}
                                               deleteTransactionItemAction={this.deleteTransactionItem}
                                               saveMerchantAction={this.saveMerchant}
                                               createMerchantAction={this.createMerchant}
                                               revertMerchantCreateAction={this.revertMerchantCreate}
                                               saveItemAction={this.saveItem}
                                               createItemAction={this.createItem}
                                               createCategoryAction={this.createCategory}
                                               revertItemCreateAction={this.revertItemCreate}
                                               transactionDateChangeHandler={(event) => this.transactionDateChanged(event)}
                                               transactionMerchantChangeHandler={(event) => this.transactionMerchantChanged(event)}
                                               transactionItemItemChangeHandler={(event, index) => this.transactionItemItemChanged(event, index)}
                                               transactionItemMeasureChangeHandler={(event, index) => this.transactionItemMeasureChanged(event, index)}
                                               transactionItemPriceChangeHandler={(event, index) => this.transactionItemPriceChanged(event, index)}
                                               transactionItemQuantityChangeHandler={(event, index) => this.transactionItemQuantityChanged(event, index)}
                                               merchantNameChangeHandler={(event) => this.merchantNameChanged(event)}
                                               itemNameChangeHandler={(event, index) => this.itemNameChanged(event, index)}
                                               categoryChangeHandler={(event, index) => this.categoryChanged(event, index)}
                                               categoryNameChangeHandler={(event, index) => this.categoryNameChanged(event, index)}/>
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
