import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ItemsPage from "./components/DataManagement/Items/ItemsPage/ItemsPage";
import Switch from "react-router/es/Switch";
import Route from "react-router/es/Route";
import CategoriesPage from "./components/DataManagement/Categories/CategoriesPage/CategoriesPage";
import Reports from "./components/Reports/Reports";
import TransactionsPage from "./components/DataManagement/Transactions/TransactionsPage/TransactionsPage";
import MeasuresPage from "./components/DataManagement/Measures/MeasuresPage/MeasuresPage";
import MerchantsPage from "./components/DataManagement/Merchants/MerchantsPage/MerchantsPage";

const contextPath = '/expense-tracker';
const idPathParam = '/:id';

export const reportsPageName = 'Reports';
export const reportsPagePath = '/reports';
export const reportsPageLabel = 'Analyze Transactions';

export const transactionsPageName = 'Transactions';
export const transactionsPagePath = '/transactions';
export const transactionsPageLabel = 'Manage Transactions';

export const itemsPageName = 'Items';
export const itemsPagePath = '/items';
export const itemsPageLabel = 'Item Configuration';

export const categoriesPageName = 'Categories';
export const categoriesPagePath = '/categories';
export const categoriesPageLabel = 'Category Configuration';

export const merchantsPageName = 'Merchants';
export const merchantsPagePath = '/merchants';
export const merchantsPageLabel = 'Merchant Configuration';

export const measuresPageName = 'Measures';
export const measuresPagePath = '/measures';
export const measuresPageLabel = 'Measure Configuration';

class App extends Component {

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER METHOD */

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={TransactionsPage}/>

                    <Route exact path={contextPath} component={Reports}/>
                    <Route path={reportsPagePath} component={Reports}/>

                    <Route exact path={transactionsPagePath} component={TransactionsPage}/>
                    <Route exact path={transactionsPagePath + idPathParam} component={TransactionsPage}/>

                    <Route exact path={itemsPagePath} component={ItemsPage}/>
                    <Route exact path={itemsPagePath + idPathParam} component={ItemsPage}/>

                    <Route exact path={categoriesPagePath} component={CategoriesPage}/>
                    <Route exact path={categoriesPagePath + idPathParam} component={CategoriesPage}/>

                    <Route exact path={merchantsPagePath} component={MerchantsPage}/>
                    <Route exact path={merchantsPagePath + idPathParam} component={MerchantsPage}/>

                    <Route exact path={measuresPagePath} component={MeasuresPage}/>
                    <Route exact path={measuresPagePath + idPathParam} component={MeasuresPage}/>
                </Switch>
            </BrowserRouter>
        );
    }

}

export default App;
