import React from 'react';
import Arrangement from "../../../Common/Arrangement/Arrangement";
import * as App from "../../../../App";
import CategoriesTabPanel from "../CategoriesTabPanel/CategoriesTabPanel";

const categoriesPage = () => {
    return (
        <Arrangement pageName={App.categoriesPageName}
                     pageLabel={App.categoriesPageLabel}>
            <CategoriesTabPanel/>
        </Arrangement>
    );
};

export default categoriesPage;