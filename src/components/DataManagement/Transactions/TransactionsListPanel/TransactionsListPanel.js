import React from "react";
import PropTypes from 'prop-types';

const transactionsListPanel = (props) => {
    return (
        <div>
            <div className="alert alert-secondary bg-light p-3">
                <div className="stateMessage text-uppercase">
                    {props.listStateMessage}
                </div>
            </div>
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
                                <td>{transaction.date}</td>
                                <td>{transaction.merchant.name}</td>
                                <td>
                                    <div className="d-block d-md-none">
                                        <button type="button"
                                                className="btn btn-secondary btn-block mr-3"
                                                onClick={() => props.editAction(transaction)}>
                                            <i className="fa fa-pencil"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-secondary btn-block mr-3"
                                                onClick={() => props.cloneAction(transaction)}>
                                            <i className="fa fa-clone"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-secondary btn-block"
                                                onClick={() => props.deleteAction(index)}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </div>
                                    <div className="d-none d-md-block btn-group" role="group">
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.editAction(transaction)}>
                                            <i className="fa fa-pencil pr-2 pl-2"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.cloneAction(transaction)}>
                                            <i className="fa fa-clone pr-2 pl-2"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.deleteAction(index)}>
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