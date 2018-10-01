import React, {Component} from "react";
import Message from "../../../messages/Message";
import ButtonGroup from "../../Common/ButtonGroup/ButtonGroup";
import Button from "../../Common/Button/Button";
import MobileButton from "../../Common/Button/MobileButton";
import StateMessage from "../../Common/StateMessage/StateMessage";
import FormHeader from "../../Common/FormHeader/FormHeader";
import * as Constants from "../../../constants/Constants";

class EditPanel extends Component {

    idSequence = 10;

    formMessages = [];
    formElements = [];

    constructor(props) {
        super(props);
        this.state = {
            editStateMessage: '',
            isFormValid: true,
            isFormDisabled: false,
            editObject: {id: 0}
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

    isEditObjectTransient() {
        return this.getEditObjectId() === 0;
    }

    getEditObject() {
        return this.state.editObject;
    }

    setEditObject(object) {
        this.setState({editObject: object});
    }

    getEditObjectId() {
        return this.getEditObject().id;
    }

    getEditObjectList() {
        return this.getTabPanel().getObjectList();
    }

    setEditObjectList(list) {
        this.getTabPanel().setObjectList(list);
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MESSAGE METHODS */

    addFormMessage(message) {
        if (message !== null) {
            this.formMessages.push(message);
        }
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALIDATION METHODS */

    addFormElement(element) {
        console.log("addFormElement()");
        if (element !== null) {
            if (this.formElements.find(e => e.props.id === element.props.id) === undefined) {
                this.formElements.push(element);
            }
            console.log("editFormElement.length = " + this.formElements.length);
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

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE LISTENERS */

    updateStateOnChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    updateEditObjectStateOnChange(event) {
        const name = event.target.name.replace("editObject.", "");
        this.setEditObject({...this.getEditObject(), [name]: event.target.value});
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTION METHODS */

    save = () => {
        console.log("save");
        if (!this.validateFormElements()) {
            return;
        }
        const object = {...this.getEditObject()};
        if (this.isEditObjectTransient()) {
            // transient object - insert
            object.id = ++this.idSequence;
            this.setEditObject(object);
            this.getEditObjectList().push(object);
        } else {
            // persistent object - update
            const objects = [...this.getEditObjectList()];
            const objectRef = objects.find(o => o.id === this.getEditObjectId());
            const index = objects.indexOf(objectRef);
            objects.splice(index, 1, object);
            this.setEditObjectList(objects);
        }
        this.setEditStateMessage("Saved " + this.getEditObjectLabel() + " #" + object.id);
        this.setFormDisabled(true);
        this.setEditTabLabel(Constants.editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const object = this.getEditObjectList().find(o => o.id == id);
        if (object !== undefined) {
            this.setEditObject({...object});
            this.setEditStateMessage("Editing " + this.getEditObjectLabel() + " #" + object.id);
            this.setFormDisabled(false);
            this.setFormValid(true);
            this.setFormElementsValid();
            this.setEditTabLabel(Constants.editTabEditLabel);
            this.setSelectedTab(Constants.editTab);
        } else {
            // TODO - Report Not Found Error
            this.create();
        }
    };

    clone = (id) => {
        console.log("clone");
        const object = this.getEditObjectList().find(o => o.id == id);
        if (object !== undefined) {
            this.setEditObject(this.cloneEditObject(object));
            this.setEditStateMessage("Creating New " + this.getEditObjectLabel() + " From Clone");
            this.setFormDisabled(false);
            this.setFormValid(true);
            this.setFormElementsValid();
            this.setEditTabLabel(Constants.editTabCreateLabel);
            this.setSelectedTab(Constants.editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setEditObject(this.initEditObject());
        this.setEditStateMessage("Creating New " + this.getEditObjectLabel());
        this.setFormDisabled(false);
        this.setFormValid(true);
        this.setFormElementsValid();
        this.setEditTabLabel(Constants.editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isEditObjectTransient()) {
            this.edit(this.getEditObjectId());
            this.setEditStateMessage("Reverted to Saved Version of " + this.getEditObjectLabel() + " #" + this.getEditObjectId());
        } else {
            this.create();
            this.setEditStateMessage("Reverted Changes to New " + this.getEditObjectLabel());
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const objects = [...this.getEditObjectList()];
        const object = objects.find(o => o.id == id);
        if (object !== undefined) {
            // remove the object from the list
            const index = objects.indexOf(object);
            const deletedObject = objects.splice(index, 1);
            this.setEditObjectList(objects);
            const stateMessage = "Deleted " + this.getEditObjectLabel() + " #" + deletedObject[0].id;
            this.getListPanel().setListStateMessage(stateMessage);
            if (object.id === this.getEditObjectId()) {
                // the object is loaded in the editor
                // reset objectId to mark as transient, but leave other values for user reference
                object.id = 0;
                this.setEditObject(object);
                this.setEditStateMessage(stateMessage);
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
            this.edit(Number.parseInt(idParam, 10));
        } else {
            this.create();
        }
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <form>
                <FormHeader>
                    <StateMessage message={this.getEditStateMessage()}/>
                    <ButtonGroup className="d-none d-md-block">
                        <Button icon={"fa-save"}
                                rendered={!this.isFormDisabled()}
                                clickListener={this.save}/>
                        <Button icon={"fa-pencil"}
                                rendered={this.isFormDisabled() && !this.isEditObjectTransient()}
                                clickListener={() => this.edit(this.getEditObjectId())}/>
                        <Button icon={"fa-clone"}
                                rendered={!this.isEditObjectTransient()}
                                clickListener={() => this.clone(this.getEditObjectId())}/>
                        <Button icon={"fa-plus"}
                                clickListener={this.create}/>
                        <Button icon={"fa-undo"}
                                rendered={!this.isFormDisabled()}
                                clickListener={this.revert}/>
                        <Button icon={"fa-trash"}
                                rendered={!this.isEditObjectTransient()}
                                clickListener={() => this.delete(this.getEditObjectId())}/>
                    </ButtonGroup>
                </FormHeader>
                <div className="container-fluid p-0 m-0">
                    <div className="row">
                        <div className="col-9 col-md-12">
                            <div className="container-fluid p-0 m-0">
                                {this.renderFormElements()}
                            </div>
                        </div>
                        <div className="d-md-none col-3">
                            <MobileButton icon={"fa-save"}
                                    rendered={!this.isFormDisabled()}
                                    clickListener={this.save}/>
                            <MobileButton icon={"fa-pencil"}
                                    rendered={this.isFormDisabled() && !this.isEditObjectTransient()}
                                    clickListener={() => this.edit(this.getEditObjectId())}/>
                            <MobileButton icon={"fa-clone"}
                                    rendered={!this.isEditObjectTransient()}
                                    clickListener={() => this.clone(this.getEditObjectId())}/>
                            <MobileButton icon={"fa-plus"}
                                    clickListener={this.create}/>
                            <MobileButton icon={"fa-undo"}
                                    rendered={!this.isFormDisabled()}
                                    clickListener={this.revert}/>
                            <MobileButton icon={"fa-trash"}
                                    rendered={!this.isEditObjectTransient()}
                                    clickListener={() => this.delete(this.getEditObjectId())}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PSEUDO ABSTRACT METHODS */

    initEditObject() {}

    cloneEditObject(object) {}

    getEditObjectLabel() {}

    renderFormElements() {}

}

export default EditPanel;