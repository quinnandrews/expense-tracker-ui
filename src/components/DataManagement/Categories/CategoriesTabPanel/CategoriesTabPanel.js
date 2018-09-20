import React, {Component} from 'react';
import CategoriesListPanel from "../CategoriesListPanel/CategoriesListPanel";
import CategoriesEditPanel from "../CategoriesEditPanel/CategoriesEditPanel";
import CategoriesHelpPanel from "../CategoriesHelpPanel/CategoriesHelpPanel";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const defaultEditStateMessage = 'Creating New Category';

class CategoriesTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSequence: 3,
            selectedTab: listTab,
            listStateMessage: null,
            editStateMessage: defaultEditStateMessage,
            editFormIsDisabled: false,
            categoryId: 0,
            categoryName: '',
            categoryList: [
                {
                    id: 1,
                    name: "Beer"
                },
                {
                    id: 2,
                    name: "Food"
                },
                {
                    id: 3,
                    name: "Restaurants"
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
            message = 'Found ' + this.state.categoryList.length + ' Categories';
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

    isCategoryTransient() {
        return this.getCategoryId() === 0 || this.getCategoryId() === null || this.getCategoryId() === '';
    }

    getCategoryId() {
        return this.state.categoryId;
    }

    setCategoryId(id) {
        this.setState({categoryId: id});
    }

    getCategoryName() {
        return this.state.categoryName;
    }

    setCategoryName(name) {
        this.setState({categoryName: name});
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
        let category = null;
        if (this.state.categoryId !== 0) {
            // persistent object - update
            category = this.getCategoryList().find(c => c.id == this.state.categoryId);
            category.id = this.getCategoryId();
            category.name = this.getCategoryName();
        } else {
            // transient object - insert
            category = {
                id: null,
                name: null
            }
            const newCategoryId = ++this.state.idSequence;
            this.setCategoryId(newCategoryId);
            category.id = newCategoryId;
            category.name = this.getCategoryName();
            this.getCategoryList().push(category);
        }
        console.log(category);
        this.setEditStateMessage('Saved Category #' + category.id);
        this.setIsEditFormDisabled(true);
    };

    edit = () => {
        console.log("edit");
        if (!this.isCategoryTransient()) {
            const category = this.getCategoryList().find(c => c.id == this.getCategoryId());
            this.setCategoryId(category.id);
            this.setCategoryName(category.name);
            this.setEditStateMessage('Editing Category #' + category.id);
            this.setIsEditFormDisabled(false);
        }
    };

    clone = () => {
        console.log("clone");
        if (!this.isCategoryTransient()) {
            const cloneName = 'COPY OF ' + this.getCategoryName();
            this.setCategoryId(0);
            this.setCategoryName(cloneName);
            this.setEditStateMessage('Creating New Category From Clone');
            this.setIsEditFormDisabled(false);
        }
    };

    create = () => {
        console.log("create");
        this.setCategoryId(0);
        this.setCategoryName('');
        this.setEditStateMessage('Creating New Category');
        this.setIsEditFormDisabled(false);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isCategoryTransient()) {
            this.edit();
            this.setEditStateMessage('Reverted to Saved Version of Category #' + this.getCategoryId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Category');
        }
    };

    delete = () => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        if (!this.isCategoryTransient()) {
            const categories = [...this.getCategoryList()];
            const category = categories.find(c => c.id == this.getCategoryId());
            const index = categories.indexOf(category);
            const deletedCategory = categories.splice(index, 1);
            this.setCategoryList(categories);
            this.create();
            this.setEditStateMessage('Deleted Category #' + deletedCategory[0].id);
            this.setIsEditFormDisabled(true);
        }
    };

    editFromList = (category) => {
        console.log("editFromList");
        this.setCategoryId(category.id);
        this.setCategoryName(category.name);
        this.setEditStateMessage('Editing Category #' + category.id);
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    cloneFromList = (category) => {
        console.log("cloneFromList");
        this.setCategoryId(0);
        this.setCategoryName('COPY OF ' + category.name);
        this.setEditStateMessage('Creating New Category From Clone');
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    deleteFromList = (index) => {
        console.log("deleteFromList");
        // TODO: check if any associated Transactions exist
        const categories = [...this.getCategoryList()];
        const deletedCategory = categories.splice(index, 1);
        this.setCategoryList(categories);
        this.setListStateMessage('Deleted Category #' + deletedCategory[0].id);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    categoryNameChanged(event) {
        this.setCategoryName(event.target.value);
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
                        <CategoriesListPanel listStateMessage={this.getListStateMessage()}
                                             categoryList={this.getCategoryList()}
                                             editAction={this.editFromList}
                                             cloneAction={this.cloneFromList}
                                             deleteAction={this.deleteFromList}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(editTab)}
                         id="editor"
                         role="tabpanel"
                         aria-labelledby="editor-tab">
                        <CategoriesEditPanel editStateMessage={this.getEditStateMessage()}
                                             isEditFormDisabled={this.isEditFormDisabled()}
                                             isCategoryTransient={this.isCategoryTransient()}
                                             categoryId={this.getCategoryId()}
                                             categoryName={this.getCategoryName()}
                                             saveAction={this.save}
                                             editAction={this.edit}
                                             cloneAction={this.clone}
                                             createAction={this.create}
                                             revertAction={this.revert}
                                             deleteAction={this.delete}
                                             categoryNameChangeHandler={(event) => this.categoryNameChanged(event)}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(helpTab)}
                         id="guide"
                         role="tabpanel"
                         aria-labelledby="guide-tab">
                        <CategoriesHelpPanel/>
                    </div>
                </div>
            </div>
        );
    }

}

export default CategoriesTabPanel;
