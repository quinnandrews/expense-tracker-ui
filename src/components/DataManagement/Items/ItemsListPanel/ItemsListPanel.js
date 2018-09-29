import React from "react";
import PropTypes from 'prop-types';
import StateMessage from "../../../Common/StateMessage/StateMessage";
import FormHeader from "../../../Common/FormHeader/FormHeader";

const itemsListPanel = (props) => {
    return (
        <div>
            <FormHeader>
                <StateMessage message={props.listStateMessage}/>
            </FormHeader>
            <table className="table table-light table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.itemList.map( (item, index) => {
                        return(
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.category.name}</td>
                                <td>
                                    <div className="d-block d-md-none">
                                        <button type="button"
                                                className="btn btn-secondary btn-block mr-3"
                                                onClick={() => props.editAction(item.id)}>
                                            <i className="fa fa-pencil"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-secondary btn-block mr-3"
                                                onClick={() => props.cloneAction(item.id)}>
                                            <i className="fa fa-clone"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-secondary btn-block"
                                                onClick={() => props.deleteAction(item.id)}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </div>
                                    <div className="d-none d-md-block btn-group" role="group">
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.editAction(item.id)}>
                                            <i className="fa fa-pencil pr-2 pl-2"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.cloneAction(item.id)}>
                                            <i className="fa fa-clone pr-2 pl-2"/>
                                        </button>
                                        <button type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => props.deleteAction(item.id)}>
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

itemsListPanel.propTypes = {
    listStateMessage: PropTypes.string.isRequired,
    itemList: PropTypes.array.isRequired,
    editAction: PropTypes.func.isRequired,
    cloneAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired
};

export default itemsListPanel;