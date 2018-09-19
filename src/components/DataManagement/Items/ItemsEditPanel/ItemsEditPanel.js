import React from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";

const itemsEditPanel = (props) => {
    return (
        <form>
            <div className="navbar-inverse bg-inverse mb-3">
                <div className="d-md-flex justify-content-between alert alert-secondary bg-light p-3"
                     role="alert">
                    <div className="stateMessage text-uppercase">
                        {props.editStateMessage}
                    </div>
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
                                    onClick={props.editAction}>
                                <i className="fa fa-pencil pr-2 pl-2"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isItemTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={props.cloneAction}>
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
                                    onClick={props.deleteAction}>
                                <i className="fa fa-trash pr-2 pl-2"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                    </div>
                </div>
            </div>
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
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="itemCategory">Category *</label>
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
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="fa fa-plus" aria-hidden="true"/>
                                                </span>
                                            </div>
                                        </div>
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
                                    onClick={props.editAction}>
                                <i className="fa fa-pencil pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isItemTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={props.cloneAction}>
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
                                    onClick={props.deleteAction}>
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
    categoryList: PropTypes.array.isRequired,
    saveAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    createAction: PropTypes.func.isRequired,
    revertAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
    itemNameChangeHandler: PropTypes.func.isRequired,
    itemCategoryChangeHandler: PropTypes.func.isRequired,
};

export default itemsEditPanel;