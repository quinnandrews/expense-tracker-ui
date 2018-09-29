import React from 'react';
import Link from "react-router-dom/es/Link";
import * as App from "../../../App";
import PropTypes from "prop-types";
import Wrapper from "../Wrapper/Wrapper";

const arrangement = (props) => {

    const pageName = props.pageName;
    const pageLabel = props.pageLabel;

    function getNavLinkClassName(link) {
        return link === pageName ? 'nav-link active' : 'nav-link';
    }

    /* TODO - Refactor Link to NavLink */
    return (
        <Wrapper>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <span className="navbar-brand">
                        <Link to={'/'} className="navbar-brand">Expense Tracker</Link>
                    </span>
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarMenu"
                            aria-controls="navbarMenu"
                            aria-expanded="false"
                            aria-label="toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <ul className="navbar-nav d-md-none">
                            <li className="nav-item">
                                <Link to={App.reportsPagePath}
                                      className={getNavLinkClassName(App.reportsPageName)}>
                                    {App.reportsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.transactionsPagePath}
                                      className={getNavLinkClassName(App.transactionsPageName)}>
                                    {App.transactionsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.itemsPagePath}
                                      className={getNavLinkClassName(App.itemsPageName)}>
                                    {App.itemsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.categoriesPagePath}
                                      className={getNavLinkClassName(App.categoriesPageName)}>
                                    {App.categoriesPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.merchantsPagePath}
                                      className={getNavLinkClassName(App.merchantsPageName)}>
                                    {App.merchantsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.measuresPagePath}
                                      className={getNavLinkClassName(App.measuresPageName)}>
                                    {App.measuresPageName}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="container-fluid content-grid">
                <div className="row content-row">
                    <nav className="col-md-2 d-none d-md-block bg-light border-right p-2 pt-4 sidebar">
                        <ul className="nav d-block m-auto">
                            <li className="nav-item">
                                <Link to={App.reportsPagePath}
                                      className={getNavLinkClassName(App.reportsPageName)}>
                                    {App.reportsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.transactionsPagePath}
                                      className={getNavLinkClassName(App.transactionsPageName)}>
                                    {App.transactionsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.itemsPagePath}
                                      className={getNavLinkClassName(App.itemsPageName)}>
                                    {App.itemsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.categoriesPagePath}
                                      className={getNavLinkClassName(App.categoriesPageName)}>
                                    {App.categoriesPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.merchantsPagePath}
                                      className={getNavLinkClassName(App.merchantsPageName)}>
                                    {App.merchantsPageName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={App.measuresPagePath}
                                      className={getNavLinkClassName(App.measuresPageName)}>
                                    {App.measuresPageName}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="col-12 col-md-10 p-0">

                        <div className="bg-light border-bottom p-2 pl-3 pr-3 pl-md-4 pr-md-4">{pageLabel}</div>

                        <div className="pt-2"/>

                        <main className="mt-3 mb-3">
                            {props.children}
                        </main>

                        <div className="pt-3"/>

                    </div>
                </div>
            </div>

            <footer className="text-muted text-center border-top d-none">
                <p className="footer-message p-3"><i className="fa fa-copyright"/> 2018 Quinn Andrews</p>
            </footer>
        </Wrapper>
    );
};

arrangement.propTypes = {
    pageName: PropTypes.string.isRequired,
    pageLabel: PropTypes.string.isRequired
};

export default arrangement;