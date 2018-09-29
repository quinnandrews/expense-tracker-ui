import React from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";
import StateMessage from "../../../Common/StateMessage/StateMessage";
import FormHeader from "../../../Common/FormHeader/FormHeader";

const categoriesEditPanel = (props) => {
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
                    <Render if={props.isEditFormDisabled && !props.isCategoryTransient}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => props.editAction(props.categoryId)}>
                            <i className="fa fa-pencil pr-2 pl-2"
                               aria-hidden="true"/>
                        </button>
                    </Render>
                    <Render if={!props.isCategoryTransient}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => props.cloneAction(props.categoryId)}>
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
                    <Render if={!props.isCategoryTransient}>
                        <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => props.deleteAction(props.categoryId)}>
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
                                        <label htmlFor="categoryName">Name *</label>
                                        <input type="text"
                                               className="form-control"
                                               id="categoryName"
                                               required={true}
                                               maxLength={32}
                                               disabled={props.isEditFormDisabled}
                                               onChange={props.categoryNameChangeHandler}
                                               value={props.categoryName}/>
                                        <small className="form-text text-muted">
                                            32 Characters Maximum. Must be unique.
                                        </small>
                                    </div>
                                </div>
                                <div className="col-md-6"/>
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
                        <Render if={props.isEditFormDisabled && !props.isCategoryTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.editAction(props.categoryId)}>
                                <i className="fa fa-pencil pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isCategoryTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.cloneAction(props.categoryId)}>
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
                        <Render if={!props.isCategoryTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.deleteAction(props.categoryId)}>
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

categoriesEditPanel.propTypes = {
    editStateMessage: PropTypes.string.isRequired,
    isEditFormDisabled: PropTypes.bool.isRequired,
    isCategoryTransient: PropTypes.bool.isRequired,
    categoryId: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
    saveAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    createAction: PropTypes.func.isRequired,
    revertAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
    categoryNameChangeHandler: PropTypes.func.isRequired
};

export default categoriesEditPanel;