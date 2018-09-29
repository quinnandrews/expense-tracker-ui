import React from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";
import StateMessage from "../../../Common/StateMessage/StateMessage";
import FormHeader from "../../../Common/FormHeader/FormHeader";

const itemsEditPanel = (props) => {
    return (
        <form>
            <FormHeader>
                <StateMessage message={props.editStateMessage}/>
                    <div className="btn-group d-none d-md-block"
                         role="group">
                    <Render if={!props.isEditFormDisabled}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={props.saveAction}>
                            <i className="fa fa-save pr-2 pl-2"
                               aria-hidden="true"/>
                        </button>
                    </Render>
                    <Render if={props.isEditFormDisabled && !props.isItemTransient}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => props.editAction(props.itemId)}>
                            <i className="fa fa-pencil pr-2 pl-2"
                               aria-hidden="true"/>
                        </button>
                    </Render>
                    <Render if={!props.isItemTransient}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => props.cloneAction(props.itemId)}>
                            <i className="fa fa-clone pr-2 pl-2"
                               aria-hidden="true"/>
                        </button>
                    </Render>
                    <button type="button"
                            className="btn btn-outline-secondary"
                            onClick={props.createAction}>
                        <i className="fa fa-plus pr-2 pl-2"
                           aria-hidden="true"/>
                    </button>
                    <Render if={!props.isEditFormDisabled}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={props.revertAction}>
                            <i className="fa fa-undo pr-2 pl-2"
                               aria-hidden="true"/>
                        </button>
                    </Render>
                    <Render if={!props.isItemTransient}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => props.deleteAction(props.itemId)}>
                            <i className="fa fa-trash pr-2 pl-2"
                               aria-hidden="true"/>
                        </button>
                    </Render>
                </div>
            </FormHeader>
            <div className="container-fluid p-0 m-0">
                <div className="row">
                    <div className="col-9 col-md-12">
                        <div className="container-fluid p-0 m-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="itemName">Name *</label>
                                        <input type="text"
                                               className="form-control"
                                               id="itemName"
                                               required={true}
                                               maxLength={128}
                                               disabled={props.isEditFormDisabled}
                                               onChange={props.itemNameChangeHandler}
                                               value={props.itemName}/>
                                        <small className="form-text text-muted">
                                            128 Characters Maximum. Must be unique.
                                        </small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="itemCategory">Category *</label>
                                        <Render if={!props.showCategoryCreate}>
                                            <div className="input-group">
                                                <select className="custom-select"
                                                        id="itemCategory"
                                                        aria-label="Item Category Select Options"
                                                        required={true}
                                                        disabled={props.isEditFormDisabled}
                                                        onChange={props.itemCategoryChangeHandler}
                                                        value={props.itemCategoryId}>
                                                    <option>Choose...</option>
                                                    {
                                                        props.categoryList.map((category) => {
                                                            return (
                                                                <option key={category.id}
                                                                        value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <div className="input-group-append input-group-clickable"
                                                     onClick={props.createCategoryAction}>
                                                    <span className="input-group-text">
                                                        <i className="fa fa-plus" aria-hidden="true"/>
                                                    </span>
                                                </div>
                                            </div>
                                            <small className="form-text text-muted">
                                                Select a Category or click the <i className="fa fa-plus" aria-hidden="true"/> button
                                                to add a new Category.
                                            </small>
                                        </Render>
                                        <Render if={props.showCategoryCreate}>
                                            <div className="input-group">
                                                <input type="text"
                                                       className="form-control"
                                                       id="itemCategory"
                                                       required={true}
                                                       disabled={props.isEditFormDisabled}
                                                       onChange={props.categoryNameChangeHandler}
                                                       value={props.categoryName}/>
                                                <div className="input-group-append input-group-clickable"
                                                     onClick={props.saveCategoryAction}>
                                                    <span className="input-group-text">
                                                        <i className="fa fa-save" aria-hidden="true"/>
                                                    </span>
                                                </div>
                                                <div className="input-group-append input-group-clickable"
                                                     onClick={props.revertCategoryCreateAction}>
                                                    <span className="input-group-text">
                                                        <i className="fa fa-undo" aria-hidden="true"/>
                                                    </span>
                                                </div>
                                            </div>
                                            <small className="form-text text-muted">
                                                Enter a Category name and click the <i className="fa fa-save" aria-hidden="true"/> button
                                                to save, or click the <i className="fa fa-undo" aria-hidden="true"/> button to revert to
                                                the select dropdown.
                                            </small>
                                        </Render>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-md-none col-3">
                        <Render if={!props.isEditFormDisabled}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={props.saveAction}>
                                <i className="fa fa-save pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={props.isEditFormDisabled && !props.isItemTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.editAction(props.itemId)}>
                                <i className="fa fa-pencil pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isItemTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.cloneAction(props.itemId)}>
                                <i className="fa fa-clone pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <button type="button"
                                className="btn btn-secondary btn-block"
                                onClick={props.createAction}>
                            <i className="fa fa-plus pr-1 pl-1"
                               aria-hidden="true"/>
                        </button>
                        <Render if={!props.isEditFormDisabled}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={props.revertAction}>
                                <i className="fa fa-undo pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isItemTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.deleteAction(props.itemId)}>
                                <i className="fa fa-trash pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                    </div>
                </div>
            </div>
        </form>
    );
};

itemsEditPanel.propTypes = {
    editStateMessage: PropTypes.string.isRequired,
    isEditFormDisabled: PropTypes.bool.isRequired,
    isItemTransient: PropTypes.bool.isRequired,
    itemId: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    itemCategoryId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    categoryName: PropTypes.string,
    showCategoryCreate: PropTypes.bool.isRequired,
    categoryList: PropTypes.array.isRequired,
    saveAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    createAction: PropTypes.func.isRequired,
    revertAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
    saveCategoryAction: PropTypes.func.isRequired,
    createCategoryAction: PropTypes.func.isRequired,
    revertCategoryCreateAction: PropTypes.func.isRequired,
    itemNameChangeHandler: PropTypes.func.isRequired,
    itemCategoryChangeHandler: PropTypes.func.isRequired,
    categoryNameChangeHandler: PropTypes.func.isRequired
};

export default itemsEditPanel;