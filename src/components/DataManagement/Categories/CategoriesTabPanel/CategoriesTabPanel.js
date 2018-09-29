import React, {Component} from 'react';
import CategoriesListPanel from "../CategoriesListPanel/CategoriesListPanel";
import CategoriesEditPanel from "../CategoriesEditPanel/CategoriesEditPanel";
import CategoriesHelpPanel from "../CategoriesHelpPanel/CategoriesHelpPanel";
import PropTypes from "prop-types";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const editTabCreateLabel = 'CREATE';
const editTabEditLabel = 'EDIT';

class CategoriesTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSequence: 3,
            selectedTab: null,
            editTabLabel: null,
            listStateMessage: null,
            editStateMessage: null,
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
            message = 'Found ' + this.getCategoryList().length + ' Categories';
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
        if (!this.isCategoryTransient()) {
            // persistent object - update
            category = this.getCategoryList().find(c => c.id == this.getCategoryId());
            category.id = this.getCategoryId();
            category.name = this.getCategoryName();
        } else {
            // transient object - insert
            category = {
                id: null,
                name: null
            };
            const newCategoryId = ++this.state.idSequence;
            this.setCategoryId(newCategoryId);
            category.id = newCategoryId;
            category.name = this.getCategoryName();
            this.getCategoryList().push(category);
        }
        console.log(category);
        this.setEditStateMessage('Saved Category #' + category.id);
        this.setIsEditFormDisabled(true);
        this.setEditTabLabel(editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const category = this.getCategoryList().find(c => c.id == id);
        if (category !== undefined) {
            this.setCategoryId(category.id);
            this.setCategoryName(category.name);
            this.setEditStateMessage('Editing Category #' + category.id);
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
        const category = this.getCategoryList().find(c => c.id == id);
        if (category !== undefined) {
            const cloneName = 'COPY OF ' + category.name;
            this.setCategoryId(0);
            this.setCategoryName(cloneName);
            this.setEditStateMessage('Creating New Category From Clone');
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabCreateLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setCategoryId(0);
        this.setCategoryName('');
        this.setEditStateMessage('Creating New Category');
        this.setIsEditFormDisabled(false);
        this.setEditTabLabel(editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isCategoryTransient()) {
            this.edit(this.getCategoryId());
            this.setEditStateMessage('Reverted to Saved Version of Category #' + this.getCategoryId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Category');
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const categories = [...this.getCategoryList()];
        const category = categories.find(c => c.id == id);
        if (category !== undefined) {
            // remove the category from the list
            const index = categories.indexOf(category);
            const deletedCategory = categories.splice(index, 1);
            this.setCategoryList(categories);
            this.setListStateMessage('Deleted Category #' + deletedCategory[0].id);
            if (category.id === this.getCategoryId()) {
                // the category is loaded in the editor
                // reset categoryId to mark as transient, but leave other values for user reference
                this.setCategoryId(0);
                this.setEditStateMessage('Deleted Category #' + deletedCategory[0].id);
                this.setIsEditFormDisabled(true);
            }
        } else {
            // TODO - Report Not Found Error
        }
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    categoryNameChanged(event) {
        this.setCategoryName(event.target.value);
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
                        <CategoriesListPanel listStateMessage={this.getListStateMessage()}
                                             categoryList={this.getCategoryList()}
                                             editAction={this.edit}
                                             cloneAction={this.clone}
                                             deleteAction={this.delete}/>
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

CategoriesTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default CategoriesTabPanel;
