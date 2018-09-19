import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";

const transactionsPage = () => {
    return (
        <Arrangement pageName={App.transactionsPageName}
                     pageLabel={App.transactionsPageLabel}>

        </Arrangement>
    );
};

export default transactionsPage;