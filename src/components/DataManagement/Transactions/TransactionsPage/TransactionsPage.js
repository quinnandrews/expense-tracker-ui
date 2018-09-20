import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import TransactionsTabPanel from "../TransactionsTabPanel/TransactionsTabPanel";

const transactionsPage = () => {
    return (
        <Arrangement pageName={App.transactionsPageName}
                     pageLabel={App.transactionsPageLabel}>
            <TransactionsTabPanel/>
        </Arrangement>
    );
};

export default transactionsPage;