import React from "react";
import IconKey from "../../../Common/IconKey/IconKey";

const categoriesHelpPanel = () => {
    return(
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        About Categories
                    </p>
                    <p>
                        Categories group like Items for the purpose of reporting by the <em>kinds</em> of things
                        purchased rather than the things themselves (which is sometimes too specific for answering some
                        questions).
                    </p>
                    <p>
                        A Category can only be deleted if it has no associated Items.
                    </p>
                </div>
                <div className="col-md-6">
                    <p className="font-weight-bold">
                        Category Properties
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
                            <td>Category identifier in the Expense Tracker Database. Number.</td>
                            <td>(generated)</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                The name of the Category. Can be as specific or general as one wishes. String.
                                32 character maximum. Unique.
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

export default categoriesHelpPanel;