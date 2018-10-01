import React from "react";
import PropTypes from 'prop-types';
import EditPanel from "../../../Common/EditPanel/EditPanel";
import TextInput from "../../../Common/TextInput/TextInput";

class MeasuresEditPanel extends EditPanel {

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> METHOD OVERRIDES */

    initEditObject() {
        return {
            id: 0,
            name: '',
            symbol: ''
        }
    }

    cloneEditObject(object) {
        const clone = this.initEditObject();
        clone.name = "COPY OF " + object.name;
        return clone;
    }

    getEditObjectLabel() {
        return "Measure";
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
                               disabled={this.isFormDisabled()}
                               ref={(element) => this.addFormElement(element)}/>
                </div>
                <div className="col-md-6">
                    <TextInput id="editObject.symbol"
                               label="Symbol"
                               helpText="2 Characters Maximum. Must be unique."
                               value={this.getEditObject().symbol}
                               valueChangeHandler={(event) => this.updateEditObjectStateOnChange(event)}
                               required={true}
                               maxLength={2}
                               disabled={this.isFormDisabled()}
                               ref={(element) => this.addFormElement(element)}/>
                </div>
            </div>
        );
    }

}

MeasuresEditPanel.propTypes = {
    idParam: PropTypes.string,
    tabPanelRef: PropTypes.object,
    listPanelRef: PropTypes.object
};

export default MeasuresEditPanel;