import React from "react";
import PropTypes from 'prop-types';
import TextInput from "../../../Common/TextInput/TextInput";
import ToLowerCaseConverter from "../../../../converters/ToLowerCaseConverter";
import DoesNotInclude0Validator from "../../../../validators/DoesNotInclude0Validator";
import EditPanel from "../../../Common/EditPanel/EditPanel";

class MerchantsEditPanel extends EditPanel {

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> METHOD OVERRIDES */

    initEditObject() {
        return {
            id: 0,
            name: ''
        }
    }

    cloneEditObject(object) {
        const clone = this.initEditObject();
        clone.name = "COPY OF " + object.name;
        return clone;
    }

    getEditObjectLabel() {
        return "Merchant";
    }

    renderFormElements() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <TextInput id="editObject.name"
                               label="Name"
                               helpText="32 Characters Maximum. Must be unique."
                               value={this.getEditObject().name}
                               valueChangeHandler={(event) => this.updateEditObjectStateOnChange(event)}
                               required={true}
                               maxLength={32}
                               converter={new ToLowerCaseConverter()}
                               validator={new DoesNotInclude0Validator()}
                               disabled={this.isFormDisabled()}
                               ref={(element) => this.addFormElement(element)}/>
                    {/* the converter and validator are for demo purposes only */}
                </div>
                <div className="col-md-6"/>
            </div>
        );
    }

}

MerchantsEditPanel.propTypes = {
    idParam: PropTypes.string,
    tabPanelRef: PropTypes.object,
    listPanelRef: PropTypes.object
};

export default MerchantsEditPanel;