import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import MerchantsTabPanel from "../MerchantsTabPanel/MerchantsTabPanel";

const merchantsPage = () => {
    return (
        <Arrangement pageName={App.merchantsPageName}
                     pageLabel={App.merchantsPageLabel}>
            <MerchantsTabPanel/>
        </Arrangement>
    );
};

export default merchantsPage;