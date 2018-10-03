import React, {Component} from "react";
import ButtonGroup from "../../Common/ButtonGroup/ButtonGroup";
import StateMessage from "../../Common/StateMessage/StateMessage";
import FormHeader from "../../Common/FormHeader/FormHeader";
import Wrapper from "../../Common/Wrapper/Wrapper";
import Table from "../Table/Table";
import ActionButton from "../Button/ActionButton";
import MobileActionButton from "../Button/MobileActionButton";

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
                <ButtonGroup className="d-none d-md-block">
                    <ActionButton icon="fa-pencil"
                                  clickListener={() => this.getEditPanel().edit(objectId)}/>
                    <ActionButton icon="fa-clone"
                                  clickListener={() => this.getEditPanel().clone(objectId)}/>
                    <ActionButton icon="fa-trash"
                                  clickListener={() => this.getEditPanel().delete(objectId)}/>
                </ButtonGroup>
                <div className="d-block d-md-none">
                    <MobileActionButton icon="fa-pencil"
                                        clickListener={() => this.getEditPanel().edit(objectId)}/>
                    <MobileActionButton icon="fa-clone"
                                        clickListener={() => this.getEditPanel().clone(objectId)}/>
                    <MobileActionButton icon="fa-trash"
                                        clickListener={() => this.getEditPanel().delete(objectId)}/>
                </div>
            </td>
        );
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PSEUDO ABSTRACT METHODS */

    getListObjectLabel() {}

    getColumnLabels() {}

    renderRows() {}

}

export default ListPanel;