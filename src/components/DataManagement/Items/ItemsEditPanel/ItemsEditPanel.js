import React from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";
import EditPanel from "../../../Common/EditPanel/EditPanel";
import TextInput from "../../../Common/TextInput/TextInput";

class ItemsEditPanel extends EditPanel {

    constructor(props) {
        super(props);
        this.state.categoryCreateName = '';
        this.state.showCategoryCreate = false;
    }

    getCategoryCreateName() {
        return this.state.categoryCreateName;
    }

    setCategoryCreateName(name) {
        this.setState({categoryCreateName: name});
    }

    getShowCategoryCreate() {
        return this.state.showCategoryCreate;
    }

    setShowCategoryCreate(show) {
        this.setState({showCategoryCreate: show});
    }

    getCategoryList() {
        return this.getTabPanel().getCategoryList();
    }

    setCategoryList(list) {
        this.getTabPanel().setCategoryList(list);
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTION METHODS */

    saveCategory = () => {
        console.log("saveCategory");
        const category = {
            id: this.getCategoryList().length + 1,
            name: this.getCategoryCreateName()
        };
        const categories = [...this.getCategoryList()];
        categories.push(category);
        categories.sort((a, b) => a.name.localeCompare(b.name));
        this.setCategoryList(categories);
        const object = {...this.getEditObject()};
        object.categoryId = category.id;
        this.setEditObject(object);
        this.setCategoryCreateName('');
        this.setShowCategoryCreate(false);
    };

    createCategory = () => {
        console.log("createCategory");
        this.setCategoryCreateName('');
        this.setShowCategoryCreate(true);
    };

    revertCategoryCreate = () => {
        console.log("revertCategoryCreate");
        this.setCategoryCreateName('');
        this.setShowCategoryCreate(false);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> METHOD OVERRIDES */

    initEditObject() {
        return {
            id: 0,
            name: '',
            categoryId: ''
        }
    }

    cloneEditObject(object) {
        const clone = this.initEditObject();
        clone.name = "COPY OF " + object.name;
        clone.categoryId = object.categoryId;
        return clone;
    }

    getEditObjectLabel() {
        return "Item";
    }

    renderFormElements() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <TextInput id="editObject.name"
                               label="Name"
                               helpText="128 Characters Maximum. Must be unique."
                               value={this.getEditObject().name}
                               valueChangeHandler={(event) => this.updateEditObjectStateOnChange(event)}
                               required={true}
                               maxLength={128}
                               disabled={this.isFormDisabled()}
                               ref={(element) => this.addFormElement(element)}/>
                </div>
                <div className="col-md-6">
                    <div className="form-group">

                        {/* TODO Convert to custom Components in order to implement validation and conversion*/}

                        <Render if={this.getShowCategoryCreate() === false}>
                            <label htmlFor="editObject.categoryId">Category *</label>
                            <div className="input-group">
                                <select className="custom-select"
                                        id="editObject.categoryId"
                                        name="editObject.categoryId"
                                        required={true}
                                        disabled={this.isFormDisabled()}
                                        onChange={(event) => this.updateEditObjectStateOnChange(event)}
                                        value={this.getEditObject().categoryId}>
                                    <option>Choose...</option>
                                    {
                                        this.getCategoryList().map((category) => {
                                            return (
                                                <option key={category.id}
                                                        value={category.id}>
                                                    {category.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-light input-group-text"
                                            type="button"
                                            onClick={this.createCategory}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>
                            <small className="form-text text-muted">
                                Select a Category or click the <i className="fa fa-plus"
                                                                  aria-hidden="true"/> button
                                to add a new Category.
                            </small>
                        </Render>

                        <Render if={this.getShowCategoryCreate() === true}>
                            <label htmlFor="categoryCreateName">Category *</label>
                            <div className="input-group">
                                <input type="text"
                                       className="form-control"
                                       id="categoryCreateName"
                                       name="categoryCreateName"
                                       required={true}
                                       disabled={this.isFormDisabled()}
                                       onChange={(event) => this.updateStateOnChange(event)}
                                       value={this.getCategoryCreateName()}/>
                                <div className="input-group-append">
                                    <button className="btn btn-light input-group-text"
                                            type="button"
                                            onClick={this.saveCategory}>
                                        <i className="fa fa-save" aria-hidden="true"/>
                                    </button>
                                </div>
                                <div className="input-group-append">
                                    <button className="btn btn-light input-group-text"
                                            type="button"
                                            onClick={this.revertCategoryCreate}>
                                        <i className="fa fa-undo" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>
                            <small className="form-text text-muted">
                                Enter a Category name and click the <i className="fa fa-save"
                                                                       aria-hidden="true"/> button
                                to save, or click the <i className="fa fa-undo"
                                                         aria-hidden="true"/> button to revert to
                                the select dropdown.
                            </small>
                        </Render>
                    </div>
                </div>
            </div>

        );
    }

}

ItemsEditPanel.propTypes = {
    idParam: PropTypes.string,
    tabPanelRef: PropTypes.object,
    listPanelRef: PropTypes.object
};

export default ItemsEditPanel;