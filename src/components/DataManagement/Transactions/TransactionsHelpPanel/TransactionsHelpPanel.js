import React from "react";
import IconKey from "../../../Common/IconKey/IconKey";

const transactionsHelpPanel = () => {
    return(
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        About Transactions
                    </p>
                    <p>
                        Transactions represent an exchange of money for goods or services. They model a receipt or
                        invoice. They include all the details, such as when the Transaction was made, where or with who,
                        and what Items were purchased, how many and at what cost.
                    </p>
                    <p>
                        Each Transaction must be assigned to a Merchant. If a the Merchant does not exist when creating
                        a Transaction, a new Merchant can be created by clicking
                        the <i className="fa fa-plus pr-1 pl-1" aria-hidden="true"/> icon appended to
                        the Merchant Select Dropdown.
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        Transaction Properties
                    </p>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Property</th>
                            <th scope="col">Description</th>
                            <th scope="col">Required</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Transaction identifier in the Expense Tracker Database. Number.</td>
                            <td>(generated)</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>
                                The date and time when a Transaction was made.
                            </td>
                            <td>yes</td>
                        </tr>
                        <tr>
                            <td>Merchant</td>
                            <td>
                                Where the Transaction was made. The party in the Transaction who received money for
                                goods or services.
                            </td>
                            <td>yes</td>
                        </tr>
                        </tbody>
                    </table>
                    <IconKey/>
                </div>
            </div>
        </div>
    );
};

export default transactionsHelpPanel;