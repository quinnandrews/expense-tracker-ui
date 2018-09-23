import React from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";

const transactionsEditPanel = (props) => {
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
                        <Render if={props.isEditFormDisabled && !props.isTransactionTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.editAction(props.transactionId)}>
                                <i className="fa fa-pencil pr-2 pl-2"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isTransactionTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.cloneAction(props.transactionId)}>
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
                        <Render if={!props.isTransactionTransient}>
                            <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.deleteAction(props.transactionId)}>
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
                                        <label htmlFor="transactionDate">Date *</label>
                                        <input type="datetime-local"
                                               className="form-control"
                                               id="transactionDate"
                                               required={true}
                                               disabled={props.isEditFormDisabled}
                                               onChange={props.transactionDateChangeHandler}
                                               value={props.transactionDate}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="transactionMerchant">Merchant *</label>
                                        <div className="input-group">
                                            <select className="custom-select"
                                                    id="transactionMerchant"
                                                    required={true}
                                                    disabled={props.isEditFormDisabled}
                                                    onChange={props.transactionMerchantChangeHandler}
                                                    value={props.transactionMerchantId}>
                                                <option>Choose...</option>
                                                {
                                                    props.merchantList.map((merchant) => {
                                                        return (
                                                            <option key={merchant.id}
                                                                    value={merchant.id}>
                                                                {merchant.name}
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
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="pb-2 border-bottom">Transaction Items</h6>
                                    <div className="mb-3">
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                disabled={props.isEditFormDisabled}
                                                onClick={props.createTransactionItemAction}>
                                            <i className="fa fa-plus pr-2 pl-2"
                                               aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Render if={props.transactionItemList !== undefined && props.transactionItemList.length > 0}>
                                        <table className="table table-light table-striped table-hover">
                                            <thead>
                                            <tr className="d-none d-md-table-row">
                                                <th scope="col">Item</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Measure</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Subtotal</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                props.transactionItemList.map((transactionItem, index) => {
                                                    return (
                                                        <tr key={transactionItem.key}>
                                                            <td>
                                                                <select className="form-control"
                                                                        required={true}
                                                                        disabled={props.isEditFormDisabled}
                                                                        onChange={(event) => props.transactionItemItemChangeHandler(event, index)}
                                                                        value={transactionItem.itemId}>
                                                                    <option value='0'>Choose...</option>
                                                                    <option value='1'>Pilsner Urquell - 4pk 0.5L Cans</option>
                                                                    <option value='2'>Oly Kraut Original Sauerkraut</option>
                                                                    <option value='3'>Chocolove Chocolate Bar</option>
                                                                </select>

                                                                {/*<div className="input-group">
                                                                    <input type="text"
                                                                           className="form-control"
                                                                           placeholder="Item"/>
                                                                    <select className="custom-select">
                                                                        <option>Choose...</option>
                                                                        <option>Beer</option>
                                                                        <option>Food</option>
                                                                        <option>Home</option>
                                                                    </select>
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">
                                                                            <i className="fa fa-plus" aria-hidden="true"/>
                                                                        </span>
                                                                        <span className="input-group-text">
                                                                            <i className="fa fa-save" aria-hidden="true"/>
                                                                        </span>
                                                                        <span className="input-group-text">
                                                                            <i className="fa fa-undo" aria-hidden="true"/>
                                                                        </span>
                                                                    </div>
                                                                </div>*/}


                                                            </td>
                                                            <td>
                                                                <input type="number"
                                                                       className="form-control form-control-size-5"
                                                                       required={true}
                                                                       disabled={props.isEditFormDisabled}
                                                                       onChange={(event) => props.transactionItemQuantityChangeHandler(event, index)}
                                                                       value={transactionItem.quantity}/>
                                                            </td>
                                                            <td>
                                                                <select className="form-control"
                                                                        required={true}
                                                                        disabled={props.isEditFormDisabled}
                                                                        onChange={(event) => props.transactionItemMeasureChangeHandler(event, index)}
                                                                        value={transactionItem.measureId}>
                                                                    <option value='1'>un</option>
                                                                    <option value='2'>lb</option>
                                                                    <option value='3'>oz</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input type="number"
                                                                       className="form-control form-control-size-5"
                                                                       required={true}
                                                                       disabled={props.isEditFormDisabled}
                                                                       onChange={(event) => props.transactionItemPriceChangeHandler(event, index)}
                                                                       value={transactionItem.price}/>
                                                            </td>
                                                            <td>${transactionItem.subTotal}</td>
                                                            <td>
                                                                <button type="button"
                                                                        className="btn btn-outline-secondary"
                                                                        disabled={props.isEditFormDisabled}
                                                                        onClick={() => props.deleteTransactionItemAction(index)}>
                                                                    <i className="fa fa-trash pr-2 pl-2"
                                                                       aria-hidden="true"/>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th scope="row">Summary</th>
                                                <td>{props.transactionItemCount}</td>
                                                <td/>
                                                <td/>
                                                <td>${props.transactionItemGrandTotal}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </Render>
                                    <Render if={props.transactionItemList === undefined || props.transactionItemList.length < 1}>
                                        <p className="text-muted">
                                            <small>This Transaction does not have any Transaction Items.</small>
                                        </p>
                                    </Render>
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
                        <Render if={props.isEditFormDisabled && !props.isTransactionTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.editAction(props.transactionId)}>
                                <i className="fa fa-pencil pr-1 pl-1"
                                   aria-hidden="true"/>
                            </button>
                        </Render>
                        <Render if={!props.isTransactionTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.cloneAction(props.transactionId)}>
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
                        <Render if={!props.isTransactionTransient}>
                            <button type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={() => props.deleteAction(props.transactionId)}>
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

transactionsEditPanel.propTypes = {
    editStateMessage: PropTypes.string.isRequired,
    isEditFormDisabled: PropTypes.bool.isRequired,
    isTransactionTransient: PropTypes.bool.isRequired,
    transactionId: PropTypes.number.isRequired,
    transactionDate: PropTypes.string.isRequired,
    transactionMerchantId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    transactionItemList: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    transactionItemCount: PropTypes.number.isRequired,
    transactionItemGrandTotal: PropTypes.number.isRequired,
    merchantList: PropTypes.array.isRequired,
    saveAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    createAction: PropTypes.func.isRequired,
    revertAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
    createTransactionItemAction: PropTypes.func.isRequired,
    deleteTransactionItemAction: PropTypes.func.isRequired,
    transactionDateChangeHandler: PropTypes.func.isRequired,
    transactionMerchantChangeHandler: PropTypes.func.isRequired,
    transactionItemItemChangeHandler: PropTypes.func.isRequired,
    transactionItemMeasureChangeHandler: PropTypes.func.isRequired,
    transactionItemQuantityChangeHandler: PropTypes.func.isRequired,
    transactionItemPriceChangeHandler: PropTypes.func.isRequired,
};

export default transactionsEditPanel;