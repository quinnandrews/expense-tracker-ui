import React from "react";

const iconKey = () => {
    return (
        <section>
            <p className="font-weight-bold">
                Icons
            </p>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><i className="fa fa-floppy-o pr-1 pl-1" aria-hidden="true"/></td>
                    <td>Save</td>
                </tr>
                <tr>
                    <td><i className="fa fa-pencil pr-1 pl-1" aria-hidden="true"/></td>
                    <td>Edit</td>
                </tr>
                <tr>
                    <td><i className="fa fa-clone pr-1 pl-1" aria-hidden="true"/></td>
                    <td>Copy</td>
                </tr>
                <tr>
                    <td><i className="fa fa-plus pr-1 pl-1" aria-hidden="true"/></td>
                    <td>Create</td>
                </tr>
                <tr>
                    <td><i className="fa fa-undo pr-1 pl-1" aria-hidden="true"/></td>
                    <td>Revert Changes</td>
                </tr>
                <tr>
                    <td><i className="fa fa-trash pr-1 pl-1" aria-hidden="true"/></td>
                    <td>Delete</td>
                </tr>
                </tbody>
            </table>
        </section>
    );
};

export default iconKey;