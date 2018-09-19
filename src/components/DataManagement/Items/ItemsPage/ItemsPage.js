import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import ItemsTabPanel from "../ItemsTabPanel/ItemsTabPanel";
import * as App from "../../../../App";

const itemsPage = () => {
    return (
        <Arrangement pageName={App.itemsPageName}
                     pageLabel={App.itemsPageLabel}>
            <ItemsTabPanel/>
        </Arrangement>
    );
};

export default itemsPage;
