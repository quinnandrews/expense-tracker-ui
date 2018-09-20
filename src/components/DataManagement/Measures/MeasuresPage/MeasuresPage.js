import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import MeasuresTabPanel from "../MeasuresTabPanel/MeasuresTabPanel";

const measuresPage = () => {
    return (
        <Arrangement pageName={App.measuresPageName}
                     pageLabel={App.measuresPageLabel}>
            <MeasuresTabPanel/>
        </Arrangement>
    );
};

export default measuresPage;