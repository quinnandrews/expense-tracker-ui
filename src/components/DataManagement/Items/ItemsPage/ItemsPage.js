import React from "react";
import Arrangement from "../../../Common/Arrangement/Arrangement";
import ItemsTabPanel from "../ItemsTabPanel/ItemsTabPanel";
import * as App from "../../../../App";

const itemsPage = (props) => {
    return (
        <Arrangement pageName={App.itemsPageName}
                     pageLabel={App.itemsPageLabel}>
            <ItemsTabPanel idParam={props.match.params.id}/>
        </Arrangement>
    );
};

export default itemsPage;
