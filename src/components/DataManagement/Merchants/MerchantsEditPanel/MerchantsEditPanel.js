import React, {Component} from "react";
import PropTypes from 'prop-types';
import Render from "../../../Common/Render/Render";
import TextInput from "../../../Common/TextInput/TextInput";
import ToLowerCaseConverter from "../../../../converters/ToLowerCaseConverter";
import DoesNotInclude0Validator from "../../../../validators/DoesNotInclude0Validator";
import Message from "../../../../messages/Message";
import ButtonGroup from "../../../Common/ButtonGroup/ButtonGroup";
import Button from "../../../Common/Button/Button";
import MerchantsTabPanel, {editTab, editTabCreateLabel, editTabEditLabel} from "../MerchantsTabPanel/MerchantsTabPanel";
import MobileButton from "../../../Common/Button/MobileButton";
import StateMessage from "../../../Common/StateMessage/StateMessage";

class MerchantsEditPanel extends Component {

    idSequence = 3;

    formElements = [];
    formMessages = [];

    constructor(props) {
        super(props);
        this.state = {
            editStateMessage: '',
            isFormValid: true,
            isFormDisabled: false,
            merchantId: 0,
            merchantName: ''
        };
    }

    getTabPanel() {
        return this.props.tabPanelRef;
    }

    getListPanel() {
        return this.props.listPanelRef.current;
    }

    setSelectedTab(tab) {
        this.getTabPanel().setSelectedTab(tab);
    };

    setEditTabLabel(label) {
        this.getTabPanel().setEditTabLabel(label);
    }

    getEditStateMessage() {
        return this.state.editStateMessage;
    }

    setEditStateMessage(message) {
        this.setState({editStateMessage: message});
    }

    isFormValid() {
        return this.state.isFormValid;
    }

    setFormValid(valid) {
        this.setState({isFormValid: valid});
    }

    isFormDisabled() {
        return this.state.isFormDisabled
    }

    setFormDisabled(disabled) {
        this.setState({isFormDisabled: disabled});
    }

    isMerchantTransient() {
        return this.getMerchantId() === 0;
    }

    getMerchantId() {
        return this.state.merchantId;
    }

    setMerchantId(id) {
        this.setState({merchantId: id});
    }

    getMerchantName() {
        return this.state.merchantName;
    }

    setMerchantName(name) {
        this.setState({merchantName: name});
    }

    getMerchantList() {
        return this.getTabPanel().getMerchantList();
    }

    setMerchantList(list) {
        this.getTabPanel().setMerchantList(list);
    }

    updateStateOnChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    addFormElement(element) {
        console.log("addFormElement()");
        if (element !== null) {
            if (this.formElements.find(e => e.props.id === element.props.id) === undefined) {
                this.formElements.push(element);
            }
            console.log("editFormElement.length = " + this.formElements.length);
        }
    }

    addFormMessage(message) {
        if (message !== null) {
            this.formMessages.push(message);
        }
    }

    setFormElementsValid() {
        for (const fe of this.formElements) {
            fe.setValid(true);
        }
    }

    validateFormElements() {
        let isFormValid = true;
        for (const fe of this.formElements) {
            if (!fe.validate()) {
                isFormValid = false;
                this.addFormMessage(new Message(Message.error, "Please correct the errors below."))
            }
        }
        if (isFormValid) {

        }
        this.setFormValid(isFormValid);
        console.log("form.valid: " + isFormValid);
        return isFormValid;
    }

    save = () => {
        console.log("save");
        if (!this.validateFormElements()) {
            return;
        }
        let merchant = null;
        if (!this.isMerchantTransient()) {
            // persistent object - update
            merchant = this.getMerchantList().find(m => m.id == this.getMerchantId());
            merchant.id = this.getMerchantId();
            merchant.name = this.getMerchantName();
        } else {
            // transient object - insert
            merchant = {
                id: null,
                name: null
            };
            const newMerchantId = ++this.idSequence;
            this.setMerchantId(newMerchantId);
            merchant.id = newMerchantId;
            merchant.name = this.getMerchantName();
            this.getMerchantList().push(merchant);
        }
        console.log(merchant);
        this.setEditStateMessage("Saved Merchant #" + merchant.id);
        this.setFormDisabled(true);
        this.setEditTabLabel(editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const merchant = this.getMerchantList().find(m => m.id == id);
        if (merchant !== undefined) {
            this.setMerchantId(merchant.id);
            this.setMerchantName(merchant.name);
            this.setEditStateMessage('Editing Merchant #' + merchant.id);
            this.setFormDisabled(false);
            this.setFormValid(true);
            this.setFormElementsValid();
            this.setEditTabLabel(editTabEditLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
            this.create();
        }
    };

    clone = (id) => {
        console.log("clone");
        const merchant = this.getMerchantList().find(m => m.id == id);
        if (merchant !== undefined) {
            const cloneName = 'COPY OF ' + merchant.name;
            this.setMerchantId(0);
            this.setMerchantName(cloneName);
            this.setEditStateMessage('Creating New Merchant From Clone');
            this.setFormDisabled(false);
            this.setFormValid(true);
            this.setFormElementsValid();
            this.setEditTabLabel(editTabCreateLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setMerchantId(0);
        this.setMerchantName('');
        this.setEditStateMessage('Creating New Merchant');
        this.setFormDisabled(false);
        this.setFormValid(true);
        this.setFormElementsValid();
        this.setEditTabLabel(editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isMerchantTransient()) {
            this.edit(this.getMerchantId());
            this.setEditStateMessage('Reverted to Saved Version of Merchant #' + this.getMerchantId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Merchant');
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const merchants = [...this.getMerchantList()];
        const merchant = merchants.find(m => m.id == id);
        if (merchant !== undefined) {
            // remove the item from the list
            const index = merchants.indexOf(merchant);
            const deletedMerchant = merchants.splice(index, 1);
            this.setMerchantList(merchants);
            this.setListStateMessage('Deleted Merchant #' + deletedMerchant[0].id);
            if (merchant.id === this.getMerchantId()) {
                // the merchant is loaded in the editor
                // reset merchantId to mark as transient, but leave other values for user reference
                this.setMerchantId(0);
                this.setEditStateMessage('Deleted Merchant #' + deletedMerchant[0].id);
                this.setFormDisabled(true);
            }
        } else {
            // TODO - Report Not Found Error
        }
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LIFECYCLE METHODS */

    componentWillMount() {
        console.log('componentWillMount()');
        const idParam = this.props.idParam;
        if (idParam !== undefined) {
            this.edit(Number.parseInt(idParam));
        } else {
            this.create();
        }
    }

    componentDidMount() {
        console.log('componentDidMount()');
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <form>
                <div className="navbar-inverse bg-inverse mb-3">
                    <div className="d-md-flex justify-content-between alert alert-secondary bg-light p-3"
                         role="alert">
                        <StateMessage message={this.getEditStateMessage()}/>
                        <ButtonGroup className="d-none d-md-block">
                            <Button icon={"fa-save"}
                                    rendered={!this.isFormDisabled()}
                                    clickListener={this.save}/>
                            <Button icon={"fa-pencil"}
                                    rendered={this.isFormDisabled() && !this.isMerchantTransient()}
                                    clickListener={() => this.edit(this.getMerchantId())}/>
                            <Button icon={"fa-clone"}
                                    rendered={!this.isMerchantTransient()}
                                    clickListener={() => this.clone(this.getMerchantId())}/>
                            <Button icon={"fa-plus"}
                                    clickListener={this.create}/>
                            <Button icon={"fa-undo"}
                                    rendered={!this.isFormDisabled()}
                                    clickListener={this.revert}/>
                            <Button icon={"fa-trash"}
                                    rendered={!this.isMerchantTransient()}
                                    clickListener={() => this.delete(this.getMerchantId())}/>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="container-fluid p-0 m-0">
                    <div className="row">
                        <div className="col-9 col-md-12">
                            <div className="container-fluid p-0 m-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextInput id="merchantName"
                                                   label="Name"
                                                   helpText="32 Characters Maximum. Must be unique."
                                                   value={this.getMerchantName()}
                                                   valueChangeHandler={(event) => this.updateStateOnChange(event)}
                                                   disabled={this.isFormDisabled()}
                                                   required={true}
                                                   converter={new ToLowerCaseConverter()}
                                                   validator={new DoesNotInclude0Validator()}
                                                   ref={(element) => this.addFormElement(element)}/>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-md-none col-3">
                            <MobileButton icon={"fa-save"}
                                    rendered={!this.isFormDisabled()}
                                    clickListener={this.save}/>
                            <MobileButton icon={"fa-pencil"}
                                    rendered={this.isFormDisabled() && !this.isMerchantTransient()}
                                    clickListener={() => this.edit(this.getMerchantId())}/>
                            <MobileButton icon={"fa-clone"}
                                    rendered={!this.isMerchantTransient()}
                                    clickListener={() => this.clone(this.getMerchantId())}/>
                            <MobileButton icon={"fa-plus"}
                                    clickListener={this.create}/>
                            <MobileButton icon={"fa-undo"}
                                    rendered={!this.isFormDisabled()}
                                    clickListener={this.revert}/>
                            <MobileButton icon={"fa-trash"}
                                    rendered={!this.isMerchantTransient()}
                                    clickListener={() => this.delete(this.getMerchantId())}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

}

MerchantsEditPanel.propTypes = {
    idParam: PropTypes.string,
    tabPanelRef: PropTypes.object,
    listPanelRef: PropTypes.object
};

export default MerchantsEditPanel;