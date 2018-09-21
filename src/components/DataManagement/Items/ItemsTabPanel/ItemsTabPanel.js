import React, {Component} from 'react';
import ItemsHelpPanel from "../ItemsHelpPanel/ItemsHelpPanel";
import ItemsListPanel from "../ItemsListPanel/ItemsListPanel";
import ItemsEditPanel from "../ItemsEditPanel/ItemsEditPanel";
import PropTypes from "prop-types";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const editTabCreateLabel = 'CREATE';
const editTabEditLabel = 'EDIT';

class ItemsTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemIdSequence: 3,
            selectedTab: null,
            editTabLabel: null,
            listStateMessage: null,
            editStateMessage: null,
            editFormIsDisabled: false,
            itemId: 0,
            itemName: '',
            itemCategoryId: 0,
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
            message = 'Found ' + this.getItemList().length + ' Items';
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

    isItemTransient() {
        return this.getItemId() === 0 || this.getItemId() === null || this.getItemId() === '';
    }

    getItemId() {
        return this.state.itemId;
    }

    setItemId(id) {
        this.setState({itemId: id});
    }

    getItemName() {
        return this.state.itemName;
    }

    setItemName(name) {
        this.setState({itemName: name});
    }

    getItemCategoryId() {
        return this.state.itemCategoryId;
    }

    setItemCategoryId(id) {
        this.setState({itemCategoryId: id});
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

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTION METHODS */

    save = () => {
        console.log("save");
        let item = null;
        if (!this.isItemTransient()) {
            // persistent object - update
            item = this.getItemList().find(i => i.id == this.getItemId());
            item.id = this.getItemId();
            item.name = this.getItemName();
            item.category = this.getCategoryList().find(c => c.id == this.getItemId());
        } else {
            // transient object - insert
            item = {
                id: null,
                name: null,
                category: {
                    id: null,
                    name: null
                }
            };
            const newItemId = ++this.state.itemIdSequence;
            this.setItemId(newItemId);
            item.id = newItemId;
            item.name = this.getItemName();
            item.category = this.getCategoryList().find(c => c.id == this.getItemCategoryId());
            this.getItemList().push(item);
        }
        console.log(item);
        this.setEditStateMessage('Saved Item #' + item.id);
        this.setIsEditFormDisabled(true);
        this.setEditTabLabel(editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const item = this.getItemList().find(i => i.id == id);
        if (item !== undefined) {
            this.setItemId(item.id);
            this.setItemName(item.name);
            this.setItemCategoryId(item.category.id);
            this.setEditStateMessage('Editing Item #' + item.id);
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabEditLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    clone = (id) => {
        console.log("clone");
        const item = this.getItemList().find(i => i.id == id);
        if (item !== undefined) {
            const cloneName = 'COPY OF ' + item.name;
            this.setItemId(0);
            this.setItemName(cloneName);
            this.setItemCategoryId(item.category.id);
            this.setEditStateMessage('Creating New Item From Clone');
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabCreateLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setItemId(0);
        this.setItemName('');
        this.setItemCategoryId(0);
        this.setEditStateMessage('Creating New Item');
        this.setIsEditFormDisabled(false);
        this.setEditTabLabel(editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        if (!this.isItemTransient()) {
            this.edit(this.getItemId());
            this.setEditStateMessage('Reverted to Saved Version of Item #' + this.getItemId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Item');
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const items = [...this.getItemList()];
        const item = items.find(i => i.id == id);
        if (item !== undefined) {
            // remove the item from the list
            const index = items.indexOf(item);
            const deletedItem = items.splice(index, 1);
            this.setItemList(items);
            this.setListStateMessage('Deleted Item #' + deletedItem[0].id);
            if (item.id === this.getItemId()) {
                // the item is loaded in the editor
                // reset itemId to mark as transient, but leave other values for user reference
                this.setItemId(0);
                this.setEditStateMessage('Deleted Item #' + deletedItem[0].id);
                this.setIsEditFormDisabled(true);
            }
        } else {
            // TODO - Report Not Found Error
        }
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    itemNameChanged = (event) => {
        this.setItemName(event.target.value);
    };

    itemCategoryChanged = (event) => {
        this.setItemCategoryId(event.target.value);
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
                        <ItemsListPanel listStateMessage={this.getListStateMessage()}
                                        itemList={this.getItemList()}
                                        editAction={this.edit}
                                        cloneAction={this.clone}
                                        deleteAction={this.delete}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(editTab)}
                         id="editor"
                         role="tabpanel"
                         aria-labelledby="editor-tab">
                        <ItemsEditPanel editStateMessage={this.getEditStateMessage()}
                                        isEditFormDisabled={this.isEditFormDisabled()}
                                        isItemTransient={this.isItemTransient()}
                                        itemId={this.getItemId()}
                                        itemName={this.getItemName()}
                                        itemCategoryId={this.getItemCategoryId()}
                                        categoryList={this.getCategoryList()}
                                        saveAction={this.save}
                                        editAction={this.edit}
                                        cloneAction={this.clone}
                                        createAction={this.create}
                                        revertAction={this.revert}
                                        deleteAction={this.delete}
                                        itemNameChangeHandler={(event) => this.itemNameChanged(event)}
                                        itemCategoryChangeHandler={(event) => this.itemCategoryChanged(event)}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(helpTab)}
                         id="guide"
                         role="tabpanel"
                         aria-labelledby="guide-tab">
                        <ItemsHelpPanel/>
                    </div>
                </div>
            </div>
        );
    }

}

ItemsTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default ItemsTabPanel;
