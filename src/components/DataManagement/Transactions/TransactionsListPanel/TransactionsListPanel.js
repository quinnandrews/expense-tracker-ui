import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import StateMessage from "../../../Common/StateMessage/StateMessage";
import FormHeader from "../../../Common/FormHeader/FormHeader";

const transactionsListPanel = (props) => {
    return (
        <div>
            <FormHeader>
                <StateMessage message={props.listStateMessage}/>
            </FormHeader>
            <table className="table table-light table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Merchant</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.transactionList.map( (transaction, index) => {
                        return(
                            <tr key={transaction.id}>
                                <th scope="row">{transaction.id}</th>
                                <td>{moment(transaction.date).format('MM/DD/YYYY, hh:mm A')}</td>
                                <td>{transaction.merchant.name}</td>
                                <td>
                                    <div className="d-block d-md-none">
                                        <button type="button"
                                                className="btn btn-secondary btn-block mr-3"
                                                onClick={() => props.editAction(transaction.id)}>
                                            <i className="fa fa-pencil"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-secondary btn-block mr-3"
                                                onClick={() => props.cloneAction(transaction.id)}>
                                            <i className="fa fa-clone"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-secondary btn-block"
                                                onClick={() => props.deleteAction(transaction.id)}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </div>
                                    <div className="d-none d-md-block btn-group" role="group">
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.editAction(transaction.id)}>
                                            <i className="fa fa-pencil pr-2 pl-2"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.cloneAction(transaction.id)}>
                                            <i className="fa fa-clone pr-2 pl-2"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.deleteAction(transaction.id)}>
                                            <i className="fa fa-trash pr-2 pl-2"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

transactionsListPanel.propTypes = {
    listStateMessage: PropTypes.string.isRequired,
    transactionList: PropTypes.array.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired
};

export default transactionsListPanel;