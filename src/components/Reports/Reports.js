import React from 'react';
import Arrangement from "../Common/Arrangement/Arrangement";
import * as App from "../../App";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import YAxis from "recharts/es6/cartesian/YAxis";
import XAxis from "recharts/es6/cartesian/XAxis";
import BarChart from "recharts/es6/chart/BarChart";
import Bar from "recharts/es6/cartesian/Bar";
import Legend from "recharts/es6/component/Legend";
import PieChart from "recharts/es6/chart/PieChart";
import Pie from "recharts/es6/polar/Pie";
import Cell from "recharts/es6/component/Cell";
import {scaleOrdinal, schemeCategory10} from 'd3-scale';
import LineChart from "recharts/es6/chart/LineChart";
import Line from "recharts/es6/cartesian/Line";

const colors = scaleOrdinal(schemeCategory10).range();

const data = [
    {name: 'Beer', amount: 150},
    {name: 'Food', amount: 800},
    {name: 'Take Away', amount: 135},
    {name: 'Cats', amount: 125},
];

const data02 = [
    {name: 'New Seasons', amount: 300},
    {name: 'People\'s Co-op', amount: 210},
    {name: 'Market of Choice', amount: 90},
    {name: 'Meat, Cheese, Bread', amount: 60},
    {name: 'Blackbird Pizza', amount: 45},
    {name: 'Pine State Biscuits', amount: 30},
    {name: 'Healthy Pets NW', amount: 125},
];

const data03 = [
    {name: 'Chicken', amount: 100},
    {name: 'Pilsner Urquell 4pk', amount: 90},
    {name: 'Rad Cat Raw Cat Food', amount: 80},
    {name: 'Beef', amount: 70},
    {name: 'Bitburger 4pk', amount: 60},
    {name: 'Breakfast Burrito', amount: 60},
    {name: 'Roseline Coffee', amount: 60},
    {name: 'Pizza', amount: 45},
    {name: 'Oly Kraut Sauerkraut', amount: 44},
    {name: 'Chocolove Chocolate Bar', amount: 36},
];

const data04 = [
    { name: 'January', Beer: 170, Food: 900, TakeAway: 125, Cats: 150 },
    { name: 'February', Beer: 140, Food: 800, TakeAway: 180, Cats: 130 },
    { name: 'March', Beer: 120, Food: 1000, TakeAway: 145, Cats: 125 },
    { name: 'April', Beer: 150, Food: 850, TakeAway: 160, Cats: 150 },
    { name: 'May', Beer: 160, Food: 750, TakeAway: 105, Cats: 130 },
    { name: 'June', Beer: 130, Food: 800, TakeAway: 90, Cats: 125 },
    { name: 'July', Beer: 130, Food: 950, TakeAway: 110, Cats: 150 },
    { name: 'August', Beer: 120, Food: 900, TakeAway: 120, Cats: 130 },
    { name: 'September', Beer: 150, Food: 800, TakeAway: 135, Cats: 125 },
];

const reports = () => {
    return (
        <Arrangement pageName={App.reportsPageName}
                     pageLabel={App.reportsPageLabel}>
            <div className="container-fluid">
                <h2>Some preliminary experimentation with recharts components.</h2>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-3 mr-1 mb-3 ml-0  p-3 border rounded">
                            <h5>Example Bar Chart - Expenses by Category for September</h5>
                            <ResponsiveContainer width="100%" height={480}>
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="1 1"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Legend/>
                                    <Bar dataKey="amount" fill="#8884d8"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mt-3 mr-0 mb-3 ml-1 p-3 border rounded">
                            <h5>Example Pie Chart - Expenses by Merchant for September</h5>
                            <ResponsiveContainer width="100%" height={480}>
                                <PieChart>
                                    <Legend/>
                                    <Pie data={data02}
                                         dataKey="amount"
                                         startAngle={180}
                                         endAngle={-180}
                                         label={true}
                                         paddingAngle={3}
                                         isAnimationActive={true}>
                                        {
                                            data02.map((entry, index) => (
                                                <Cell key={`slice-${index}`} fill={colors[index % 10]}/>
                                            ))
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-3 mr-1 mb-3 ml-0 p-3 border rounded">
                            <h5>Example Line Chart - Expenses By Category - Year to Date</h5>
                            <ResponsiveContainer width="100%" height={480}>
                                <LineChart data={data04}>
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Legend />
                                    <Line type="monotone" dataKey="Beer" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="Food" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="TakeAway" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="Cats" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mt-3 mr-0 mb-3 ml-1 p-3 border rounded">
                            <h5>Example Bar Chart - Top 10 Items for September</h5>
                            <ResponsiveContainer width="100%" height={480}>
                                <BarChart data={data03}
                                          layout="vertical">
                                    <CartesianGrid strokeDasharray="1 1"/>
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={240}/>
                                    <Legend/>
                                    <Bar dataKey="amount"
                                         fill="#ff7f0e"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>


        </Arrangement>
    );
};

export default reports;