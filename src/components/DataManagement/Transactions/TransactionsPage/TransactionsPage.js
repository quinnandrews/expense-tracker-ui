import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import TransactionsTabPanel from "../TransactionsTabPanel/TransactionsTabPanel";

const transactionsPage = (props) => {
    return (
        <Arrangement pageName={App.transactionsPageName}
                     pageLabel={App.transactionsPageLabel}>
            <TransactionsTabPanel idParam={props.match.params.id}/>
        </Arrangement>
    );
};

export default transactionsPage;