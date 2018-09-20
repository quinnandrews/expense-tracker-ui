import React, {Component} from 'react';
import MeasuresHelpPanel from "../MeasuresHelpPanel/MeasuresHelpPanel";
import MeasuresEditPanel from "../MeasuresEditPanel/MeasuresEditPanel";
import MeasuresListPanel from "../MeasuresListPanel/MeasuresListPanel";

const listTab = 'listTab';
const editTab = 'editTab';
const helpTab = 'helpTab';

const defaultEditStateMessage = 'Creating New Measure';

class MeasuresTabPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSequence: 3,
            selectedTab: listTab,
            listStateMessage: null,
            editStateMessage: defaultEditStateMessage,
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
        return this.state.selectedTab === tab;
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

    isEditFormDisabled() {
        return this.state.editFormIsDisabled;
    }

    setIsEditFormDisabled(isDisabled) {
        this.setState({editFormIsDisabled: isDisabled});
    };

    getListStateMessage() {
        let message = this.state.listStateMessage;
        if (message === null) {
            message = 'Found ' + this.state.measureList.length + ' Measures';
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
        if (this.state.measureId !== 0) {
            // persistent object - update
            measure = this.getMeasureList().find(m => m.id == this.state.measureId);
            measure.id = this.getMeasureId();
            measure.name = this.getMeasureName();
            measure.symbol = this.getMeasureSymbol();
        } else {
            // transient object - insert
            measure = {
                id: null,
                name: null
            }
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
    };

    edit = () => {
        console.log("edit");
        if (!this.isMeasureTransient()) {
            const measure = this.getMeasureList().find(m => m.id == this.getMeasureId());
            this.setMeasureId(measure.id);
            this.setMeasureName(measure.name);
            this.setEditStateMessage('Editing Measure #' + measure.id);
            this.setIsEditFormDisabled(false);
        }
    };

    clone = () => {
        console.log("clone");
        if (!this.isMeasureTransient()) {
            const cloneName = 'COPY OF ' + this.getMeasureName();
            this.setMeasureId(0);
            this.setMeasureName(cloneName);
            this.setEditStateMessage('Creating New Measure From Clone');
            this.setIsEditFormDisabled(false);
        }
    };

    create = () => {
        console.log("create");
        this.setMeasureId(0);
        this.setMeasureName('');
        this.setMeasureSymbol('');
        this.setEditStateMessage('Creating New Measure');
        this.setIsEditFormDisabled(false);
    };

    revert = () => {
        console.log("revert");
        // if persistent ? revert to saved state : call create
        if (!this.isMeasureTransient()) {
            this.edit();
            this.setEditStateMessage('Reverted to Saved Version of Measure #' + this.getMeasureId());
        } else {
            this.create();
            this.setEditStateMessage('Reverted Changes to New Measure');
        }
    };

    delete = () => {
        console.log("delete");
        // TODO: check if any associated Transactions exist
        if (!this.isMeasureTransient()) {
            const measures = [...this.getMeasureList()];
            const measure = measures.find(c => c.id == this.getMeasureId());
            const index = measures.indexOf(measure);
            const deletedMeasure = measures.splice(index, 1);
            this.setMeasureList(measures);
            this.create();
            this.setEditStateMessage('Deleted Measure #' + deletedMeasure[0].id);
            this.setIsEditFormDisabled(true);
        }
    };

    editFromList = (measure) => {
        console.log("editFromList");
        this.setMeasureId(measure.id);
        this.setMeasureName(measure.name);
        this.setMeasureSymbol(measure.symbol);
        this.setEditStateMessage('Editing Measure #' + measure.id);
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    cloneFromList = (measure) => {
        console.log("cloneFromList");
        this.setMeasureId(0);
        this.setMeasureName('COPY OF ' + measure.name);
        this.setMeasureSymbol(measure.symbol)
        this.setEditStateMessage('Creating New Measure From Clone');
        this.setSelectedTab(editTab);
        this.setIsEditFormDisabled(false);
    };

    deleteFromList = (index) => {
        console.log("deleteFromList");
        // TODO: check if any associated Transactions exist
        const measures = [...this.getMeasureList()];
        const deletedMeasure = measures.splice(index, 1);
        this.setMeasureList(measures);
        this.setListStateMessage('Deleted Measure #' + deletedMeasure[0].id);
    };

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALUE CHANGE HANDLERS */

    measureNameChanged(event) {
        this.setMeasureName(event.target.value);
    };

    measureSymbolChanged(event) {
        this.setMeasureSymbol(event.target.value);
    };

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
                           onClick={() => this.setSelectedTab(editTab)}>EDIT</a>
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
                                           editAction={this.editFromList}
                                           cloneAction={this.cloneFromList}
                                           deleteAction={this.deleteFromList}/>
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

export default MeasuresTabPanel;
