import React from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";

const measuresEditPanel = (props) => {
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
                        <Render if={props.isEditFormDisabled && !props.isMeasureTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.editAction(props.measureId)}>
                                <i className="fa fa-pencil pr-2 pl-2"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isMeasureTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.cloneAction(props.measureId)}>
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
                        <Render if={!props.isMeasureTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.deleteAction(props.measureId)}>
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
                                        <label htmlFor="measureName">Name *</label>
                                        <input type="text"
                                               className="form-control"
                                               id="measureName"
                                               required={true}
                                               maxLength={32}
                                               disabled={props.isEditFormDisabled}
                                               onChange={props.measureNameChangeHandler}
                                               value={props.measureName}/>
                                        <small className="form-text text-muted">
                                            32 Characters Maximum. Must be unique.
                                        </small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="measureSymbol">Symbol *</label>
                                        <input type="text"
                                               className="form-control"
                                               id="measureName"
                                               required={true}
                                               maxLength={2}
                                               disabled={props.isEditFormDisabled}
                                               onChange={props.measureSymbolChangeHandler}
                                               value={props.measureSymbol}/>
                                        <small className="form-text text-muted">
                                            2 Characters Maximum. Must be unique.
                                        </small>
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
                        <Render if={props.isEditFormDisabled && !props.isMeasureTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.editAction(props.measureId)}>
                                <i className="fa fa-pencil pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isMeasureTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.cloneAction(props.measureId)}>
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
                        <Render if={!props.isMeasureTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.deleteAction(props.measureId)}>
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

measuresEditPanel.propTypes = {
    editStateMessage: PropTypes.string.isRequired,
    isEditFormDisabled: PropTypes.bool.isRequired,
    isMeasureTransient: PropTypes.bool.isRequired,
    measureId: PropTypes.number.isRequired,
    measureName: PropTypes.string.isRequired,
    measureSymbol: PropTypes.string.isRequired,
    saveAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    createAction: PropTypes.func.isRequired,
    revertAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
    measureNameChangeHandler: PropTypes.func.isRequired,
    measureSymbolChangeHandler: PropTypes.func.isRequired,
};

export default measuresEditPanel;