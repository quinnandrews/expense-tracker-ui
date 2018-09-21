import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import CategoriesTabPanel from "../CategoriesTabPanel/CategoriesTabPanel";

const categoriesPage = (props) => {
    return (
        <Arrangement pageName={App.categoriesPageName}
                     pageLabel={App.categoriesPageLabel}>
            <CategoriesTabPanel idParam={props.match.params.id}/>
        </Arrangement>
    );
};

export default categoriesPage;