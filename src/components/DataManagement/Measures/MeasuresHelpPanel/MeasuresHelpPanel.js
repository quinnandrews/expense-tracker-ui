import React from "react";
import IconKey from "../../../Common/IconKey/IconKey";

const measuresHelpPanel = () => {
    return(
        <div className="container-fluid p-0 pt-1 m-0">
            <div className="row">
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        About Measures
                    </p>
                    <p>
                        Measures are the manner in which things are purchased from a Merchant when a Transaction is
                        made. Were the Items purchased as discrete packaged units, where each unit has a price, or was
                        it purchased in bulk by weight, where the price is determined by the number of pounds or ounces.
                    </p>
                    <p>
                        A Measure can only be deleted if it has no associated Transaction Items.
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        Measure Properties
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
                            <td>Measure identifier in the Expense Tracker Database. Number.</td>
                            <td>(generated)</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                The name of a Measure that is used during a Transaction that determines the manner in
                                which an Item's price is calculated. If purchasing in bulk, the price would be
                                determined by the number of pounds or ounces, for example. String. 32 character maximum.
                                Unique.
                            </td>
                            <td>yes</td>
                        </tr>
                        <tr>
                            <td>Symbol</td>
                            <td>
                                2 character symbol to use in place of the Measure Name. Convenient and traditional,
                                since pounds and ounces are usually notated in the forms 'lb' and 'oz' respectively.
                                String. 2 character maximum. Unique.
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

export default measuresHelpPanel;