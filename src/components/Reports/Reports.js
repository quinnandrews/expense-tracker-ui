import React from 'react';
import Arrangement from "../Common/Arrangement/Arrangement";
import * as App from "../../App";

const reports = () => {
    return (
        <Arrangement pageName={App.reportsPageName}
                     pageLabel={App.reportsPageLabel}>

        </Arrangement>
    );
};

export default reports;