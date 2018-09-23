import React from "react";
import IconKey from "../../../Common/IconKey/IconKey";

const merchantsHelpPanel = () => {
    return(
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        About Merchants
                    </p>
                    <p>
                        Merchants represent both the location where a Transaction was made and the party in the
                        Transaction who received money in exchange for Items.
                    </p>
                    <p>
                        A Merchant can only be deleted if it has no associated Transactions.
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        Merchant Properties
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
                            <td>Merchant identifier in the Expense Tracker Database. Number.</td>
                            <td>(generated)</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                The name of the Merchant where a Transaction was made. String. 32 character maximum.
                                Unique.
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

export default merchantsHelpPanel;