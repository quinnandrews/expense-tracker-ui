import React, {Component} from 'react';
import MeasuresHelpPanel from "../MeasuresHelpPanel/MeasuresHelpPanel";
import MeasuresEditPanel from "../MeasuresEditPanel/MeasuresEditPanel";
import MeasuresListPanel from "../MeasuresListPanel/MeasuresListPanel";
import PropTypes from "prop-types";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const editTabCreateLabel = 'CREATE';
const editTabEditLabel = 'EDIT';

class MeasuresTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSequence: 3,
            selectedTab: null,
            editTabLabel: null,
            listStateMessage: null,
            editStateMessage: null,
            editFormIsDisabled: false,
            measureId: 0,
            measureName: '',
            measureSymbol: '',
            measureList: [
                {
                    id: 1,
                    name: "Units",
                    symbol: "un"
                },
                {
                    id: 2,
                    name: "Pounds",
                    symbol: "lb"
                },
                {
                    id: 3,
                    name: "Ounces",
                    symbol: "oz"
                }
            ]
        };
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PROPERTIES */

    isTabSelected(tab) {
        return this.getSelectedTab() === tab;
    }

    getSelectedTab() {
        let tab = this.state.selectedTab;
        if (tab === null) {
            tab = listTab;
        }
        return tab;
    }

    setSelectedTab(tab) {
        this.setState({selectedTab: tab});
    };

    getSelectedTabClassName(tab) {
        return this.isTabSelected(tab) ? 'nav-link active' : 'nav-link';
    }

    getSelectedTabPaneClassName(tab) {
        return this.isTabSelected(tab) ? 'tab-pane fade show active' : 'tab-pane fade';
    }

    getEditTabLabel() {
        let label = this.state.editTabLabel;
        if (label === null) {
            label = editTabEditLabel;
        }
        return label;
    }

    setEditTabLabel(label) {
        this.setState({editTabLabel: label});
    }

    isEditFormDisabled() {
        return this.state.editFormIsDisabled;
    }

    setIsEditFormDisabled(isDisabled) {
        this.setState({editFormIsDisabled: isDisabled});
    };

    getListStateMessage() {
        let message = this.state.listStateMessage;
        if (message === null) {
            message = 'Found ' + this.getMeasureList().length + ' Measures';
        }
        return message;
    }

    setListStateMessage(message) {
        this.setState({listStateMessage: message});
    }

    getEditStateMessage() {
        return this.state.editStateMessage;
    }

    setEditStateMessage(message) {
        this.setState({editStateMessage: message});
    }

    isMeasureTransient() {
        return this.getMeasureId() === 0 || this.getMeasureId() === null || this.getMeasureId() === '';
    }

    getMeasureId() {
        return this.state.measureId;
    }

    setMeasureId(id) {
        this.setState({measureId: id});
    }

    getMeasureName() {
        return this.state.measureName;
    }

    setMeasureName(name) {
        this.setState({measureName: name});
    }

    getMeasureSymbol() {
        return this.state.measureSymbol;
    }

    setMeasureSymbol(symbol) {
        this.setState({measureSymbol: symbol});
    }

    getMeasureList() {
        return this.state.measureList;
    }

    setMeasureList(list) {
        this.setState({measureList: list});
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ACTION METHODS */

    save = () => {
        console.log("save");
        let measure = null;
        if (!this.isMeasureTransient()) {
            // persistent object - update
            measure = this.getMeasureList().find(m => m.id == this.getMeasureId());
            measure.id = this.getMeasureId();
            measure.name = this.getMeasureName();
            measure.symbol = this.getMeasureSymbol();
        } else {
            // transient object - insert
            measure = {
                id: null,
                name: null,
                symbol: null
            };
            const newMeasureId = ++this.state.idSequence;
            this.setMeasureId(newMeasureId);
            measure.id = newMeasureId;
            measure.name = this.getMeasureName();
            measure.symbol = this.getMeasureSymbol();
            this.getMeasureList().push(measure);
        }
        console.log(measure);
        this.setEditStateMessage('Saved Measure #' + measure.id);
        this.setIsEditFormDisabled(true);
        this.setEditTabLabel(editTabEditLabel);
    };

    edit = (id) => {
        console.log("edit");
        const measure = this.getMeasureList().find(m => m.id == id);
        if (measure !== undefined) {
            this.setMeasureId(measure.id);
            this.setMeasureName(measure.name);
            this.setMeasureSymbol(measure.symbol);
            this.setEditStateMessage('Editing Measure #' + measure.id);
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabEditLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    clone = (id) => {
        console.log("clone");
        const measure = this.getMeasureList().find(m => m.id == id);
        if (measure !== undefined) {
            const cloneName = 'COPY OF ' + measure.name;
            this.setMeasureId(0);
            this.setMeasureName(cloneName);
            this.setMeasureSymbol(measure.symbol)
            this.setEditStateMessage('Creating New Measure From Clone');
            this.setIsEditFormDisabled(false);
            this.setEditTabLabel(editTabCreateLabel);
            this.setSelectedTab(editTab);
        } else {
            // TODO - Report Not Found Error
        }
    };

    create = () => {
        console.log("create");
        this.setMeasureId(0);
        this.setMeasureName('');
        this.setMeasureSymbol('');
        this.setEditStateMessage('Creating New Measure');
        this.setIsEditFormDisabled(false);
        this.setEditTabLabel(editTabCreateLabel);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isMeasureTransient()) {
            this.edit(this.getMeasureId());
            this.setEditStateMessage('Reverted to Saved Version of Measure #' + this.getMeasureId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Measure');
        }
    };

    delete = (id) => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        const measures = [...this.getMeasureList()];
        const measure = measures.find(c => c.id == id);
        if (measure !== undefined) {
            // remove the measure from the list
            const index = measures.indexOf(measure);
            const deletedMeasure = measures.splice(index, 1);
            this.setMeasureList(measures);
            this.setListStateMessage('Deleted Measure #' + deletedMeasure[0].id);
            if (measure.id === this.getMeasureId()) {
                // the measure is loaded in the editor
                // reset mneasureId to mark as transient, but leave other values for user reference
                this.setMeasureId(id);
                this.setEditStateMessage('Deleted Measure #' + deletedMeasure[0].id);
                this.setIsEditFormDisabled(true);
            }
        } else {
            // TODO - Report Not Found Error
        }
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    measureNameChanged(event) {
        this.setMeasureName(event.target.value);
    };

    measureSymbolChanged(event) {
        this.setMeasureSymbol(event.target.value);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LIFECYCLE METHODS */

    componentWillMount() {
        const idParam = this.props.idParam;
        if (idParam !== undefined) {
            this.edit(Number.parseInt(idParam));
        } else {
            this.create();
        }
    }

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <div>
                {/*TABS*/}
                <ul className="nav nav-tabs mb-3"
                    role="tablist">
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(listTab)}
                           id="list-tab"
                           data-toggle="tab"
                           href="#"
                           role="tab"
                           aria-controls="list"
                           aria-selected="true"
                           onClick={() => this.setSelectedTab(listTab)}>FIND</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(editTab)}
                           id="editor-tab"
                           data-toggle="tab"
                           href="#"
                           role="tab"
                           aria-controls="editor"
                           aria-selected="false"
                           onClick={() => this.setSelectedTab(editTab)}>{this.getEditTabLabel()}</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.getSelectedTabClassName(helpTab)}
                           id="guide-tab"
                           data-toggle="tab"
                           href="#"
                           role="tab"
                           aria-controls="guide"
                           aria-selected="false"
                           onClick={() => this.setSelectedTab(helpTab)}>HELP</a>
                    </li>
                </ul>
                {/*TAB PANES*/}
                <div className="tab-content">
                    <div className={this.getSelectedTabPaneClassName(listTab)}
                         id="list"
                         role="tabpanel"
                         aria-labelledby="list-tab">
                        <MeasuresListPanel listStateMessage={this.getListStateMessage()}
                                           measureList={this.getMeasureList()}
                                           editAction={this.edit}
                                           cloneAction={this.clone}
                                           deleteAction={this.delete}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(editTab)}
                         id="editor"
                         role="tabpanel"
                         aria-labelledby="editor-tab">
                        <MeasuresEditPanel editStateMessage={this.getEditStateMessage()}
                                           isEditFormDisabled={this.isEditFormDisabled()}
                                           isMeasureTransient={this.isMeasureTransient()}
                                           measureId={this.getMeasureId()}
                                           measureName={this.getMeasureName()}
                                           measureSymbol={this.getMeasureSymbol()}
                                           saveAction={this.save}
                                           editAction={this.edit}
                                           cloneAction={this.clone}
                                           createAction={this.create}
                                           revertAction={this.revert}
                                           deleteAction={this.delete}
                                           measureNameChangeHandler={(event) => this.measureNameChanged(event)}
                                           measureSymbolChangeHandler={(event) => this.measureSymbolChanged(event)}/>
                    </div>
                    <div className={this.getSelectedTabPaneClassName(helpTab)}
                         id="guide"
                         role="tabpanel"
                         aria-labelledby="guide-tab">
                        <MeasuresHelpPanel/>
                    </div>
                </div>
            </div>
        );
    }

}

MeasuresTabPanel.propTypes = {
    idParam: PropTypes.string
};

export default MeasuresTabPanel;
