import React from "react";
import IconKey from "../../../Common/IconKey/IconKey";

const itemsHelpPanel = () => {
    return(
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        About Items
                    </p>
                    <p>
                        Items are the things purchased from a Merchant when a Transaction is made. The
                        manner in which Items are distinguished is at the User's discretion. They can be
                        named generically (e.g. 'Beer') or by one or more variations, like brand or volume,
                        for example (e.g. 'Bitburger Beer' or 'Stiegel 0.5L 4-Pack').
                    </p>
                    <p>
                        Each Item must be assigned to a Category, which allows for Reports that analyze
                        data by groups of Items. If a relevant Category does not exist when creating an
                        Item, a new Category can be created by clicking
                        the <i className="fa fa-plus pr-1 pl-1" aria-hidden="true"/> icon appended to
                        the Category Select Dropdown.
                    </p>
                    <p>
                        Each Item Name must be nor more than 128 characters long and must be unique.
                    </p>
                    <p>
                        An Item can only be deleted if it has no associated Transactions.
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        Item Properties
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
                            <td>Item identifier in the Expense Tracker Database. Number.</td>
                            <td>(generated)</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                The name of the Item that was purchased in a Transaction. May include
                                details like the size of a jar, or the number of cans in a pack. String.
                                128 character maximum. Unique.
                            </td>
                            <td>yes</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                The group the Item belongs to (e.g. 'Food', 'Groceries', etc.). Useful
                                when producing Reports.
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

export default itemsHelpPanel;