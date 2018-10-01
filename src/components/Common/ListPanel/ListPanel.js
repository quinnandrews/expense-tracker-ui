import React, {Component} from "react";
import ButtonGroup from "../../Common/ButtonGroup/ButtonGroup";
import StateMessage from "../../Common/StateMessage/StateMessage";
import FormHeader from "../../Common/FormHeader/FormHeader";
import Wrapper from "../../Common/Wrapper/Wrapper";
import Table from "../Table/Table";

class ListPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listStateMessage: null
        };
    }

    getTabPanel() {
        return this.props.tabPanelRef;
    }

    getEditPanel() {
        return this.props.editPanelRef.current;
    }

    getListStateMessage() {
        let message = this.state.listStateMessage;
        if (message === null) {
            message = "Found " + this.getList().length + " " + this.getListObjectLabel();
        }
        return message;
    }

    setListStateMessage(message) {
        this.setState({listStateMessage: message});
    }

    getList() {
        return this.getTabPanel().getObjectList();
    }

    setList(list) {
        this.getTabPanel().setObjectList(list);
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHODS */

    render() {
        return (
            <Wrapper>
                <FormHeader>
                    <StateMessage message={this.getListStateMessage()}/>
                </FormHeader>
                <Table columnLabels={this.getColumnLabels()}>
                    {this.renderRows()}
                </Table>
            </Wrapper>
        );
    }
    
    renderStandardActionsCell(objectId) {
        return (
            <td>
                <div className="d-block d-md-none">
                    <button type="button"
                            className="btn btn-secondary btn-block"
                            onClick={() => this.getEditPanel().edit(objectId)}>
                        <i className="fa fa-pencil"/>
                    </button>
                    <button type="button"
                            className="btn btn-secondary btn-block"
                            onClick={() => this.getEditPanel().clone(objectId)}>
                        <i className="fa fa-clone"/>
                    </button>
                    <button type="button"
                            className="btn btn-secondary btn-block"
                            onClick={() => this.getEditPanel().delete(objectId)}>
                        <i className="fa fa-trash"/>
                    </button>
                </div>
                <ButtonGroup className="d-none d-md-block">
                    <button type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.getEditPanel().edit(objectId)}>
                        <i className="fa fa-pencil pr-2 pl-2"/>
                    </button>
                    <button type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.getEditPanel().clone(objectId)}>
                        <i className="fa fa-clone pr-2 pl-2"/>
                    </button>
                    <button type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.getEditPanel().delete(objectId)}>
                        <i className="fa fa-trash pr-2 pl-2"/>
                    </button>
                </ButtonGroup>
            </td>
        );
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PSEUDO ABSTRACT METHODS */

    getListObjectLabel() {}

    getColumnLabels() {}

    renderRows() {}

}

export default ListPanel;