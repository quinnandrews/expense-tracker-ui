import React from 'react';
import Link from "react-router-dom/es/Link";
import * as App from "../../../App";
import PropTypes from "prop-types";

const arrangement = (props) => {

    const pageName = props.pageName;
    const pageLabel = props.pageLabel;

    function getNavLinkClassName(link) {
        return link === pageName ? 'nav-link active' : 'nav-link';
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom">
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
                        <ul className="navbar-nav mr-auto"/>
                        {/* TODO: convert to component that accepts arrays */}
                        <ul className="navbar-nav">
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
                <div className="bg-light border-bottom p-2 pl-3 pr-3">{pageLabel}</div>
            </header>
            <div className="pt-2"/>
            <main className="m-3">
                {props.children}
            </main>
            <div className="pt-3"/>
            <footer className="text-muted text-center border-top mr-3 ml-3">
                <p className="footer-message p-3"><i className="fa fa-copyright"/> 2018 Quinn Andrews</p>
            </footer>
        </div>
    );
};

arrangement.propTypes = {
    pageName: PropTypes.string.isRequired,
    pageLabel: PropTypes.string.isRequired
};

export default arrangement;