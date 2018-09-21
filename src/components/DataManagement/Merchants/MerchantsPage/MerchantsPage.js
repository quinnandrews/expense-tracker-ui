import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import MerchantsTabPanel from "../MerchantsTabPanel/MerchantsTabPanel";

const merchantsPage = (props) => {
    return (
        <Arrangement pageName={App.merchantsPageName}
                     pageLabel={App.merchantsPageLabel}>
            <MerchantsTabPanel idParam={props.match.params.id}/>
        </Arrangement>
    );
};

export default merchantsPage;