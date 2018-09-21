import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import MeasuresTabPanel from "../MeasuresTabPanel/MeasuresTabPanel";

const measuresPage = (props) => {
    return (
        <Arrangement pageName={App.measuresPageName}
                     pageLabel={App.measuresPageLabel}>
            <MeasuresTabPanel idParam={props.match.params.id}/>
        </Arrangement>
    );
};

export default measuresPage;