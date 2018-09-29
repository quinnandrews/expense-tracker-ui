import React, {Component} from "react";
import PropTypes from 'prop-types';
import ButtonGroup from "../../../Common/ButtonGroup/ButtonGroup";
import StateMessage from "../../../Common/StateMessage/StateMessage";
import FormHeader from "../../../Common/FormHeader/FormHeader";
import Wrapper from "../../../Common/Wrapper/Wrapper";

class MerchantsListPanel extends Component {

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
            message = 'Found ' + this.getList().length + ' Merchants';
        }
        return message;
    }

    setListStateMessage(message) {
        this.setState({listStateMessage: message});
    }

    getList() {
        return this.getTabPanel().getMerchantList();
    }

    setList(list) {
        this.getTabPanel().setMerchantList(list);
    }

    render() {
        return (
            <Wrapper>
                <FormHeader>
                    <StateMessage message={this.getListStateMessage()}/>
                </FormHeader>
                <table className="table table-light table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.getList().map((merchant) => {
                            return(
                                <tr key={merchant.id}>
                                    <th scope="row">{merchant.id}</th>
                                    <td>{merchant.name}</td>
                                    <td>
                                        <div className="d-block d-md-none">
                                            <button type="button"
                                                    className="btn btn-secondary btn-block"
                                                    onClick={() => this.getEditPanel().edit(merchant.id)}>
                                                <i className="fa fa-pencil"/>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-secondary btn-block"
                                                    onClick={() => this.getEditPanel().clone(merchant.id)}>
                                                <i className="fa fa-clone"/>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-secondary btn-block"
                                                    onClick={() => this.getEditPanel().delete(merchant.id)}>
                                                <i className="fa fa-trash"/>
                                            </button>
                                        </div>
                                        <ButtonGroup className="d-none d-md-block">
                                            <button type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => this.getEditPanel().edit(merchant.id)}>
                                                <i className="fa fa-pencil pr-2 pl-2"/>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => this.getEditPanel().clone(merchant.id)}>
                                                <i className="fa fa-clone pr-2 pl-2"/>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => this.getEditPanel().delete(merchant.id)}>
                                                <i className="fa fa-trash pr-2 pl-2"/>
                                            </button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </Wrapper>
        );
    }

}

MerchantsListPanel.propTypes = {
    tabPanelRef: PropTypes.object,
    editPanelRef: PropTypes.object
};

export default MerchantsListPanel;