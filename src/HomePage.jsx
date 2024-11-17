import React, { useState, useEffect } from 'react';
import './styles/lib.css';


import $ from 'jquery';
import AddTransPopup from './AddTransPopup';
import squirrel from './assets/SpendWise_squi.png';
import './styles/home.css';

function HomePage({ user, fetchUserData }) {

  if (!user) {
    return <p>No user data available.</p>; // Handle case where user data is null or empty
  }

  const perMonth = getPercentageOfMonthPassed();
  const perBudget = Math.floor(100 * (user.todaySpendings / user.budgetPerMonth));
  const budget = user.weekdayBudget;

  function getPercentageOfMonthPassed() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDaysInMonth = (lastDayOfMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
    const daysPassed = (currentDate - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
    const percentagePassed = (daysPassed / totalDaysInMonth) * 100;

    return percentagePassed.toFixed(0);
  }

  return (
    <div>

      <div className="wrapper wrapper_home default-1">
        <h1 className="intro white-1">Hello, <span className="userNameJS">{user.name}</span>!</h1>
        <div className="frosted card balancecard host-grotesk wavebg-outer waveWrapper-outer">
          <h2 className="grey-1">Today's Spendings</h2>
          <h1 className={`curbal ${parseInt(user.todaySpendings) >= parseInt(user.weekdayBudget) ? "red" : "green"}-1 balanceJS`}>₹{parseInt(user.todaySpendings)}</h1>
          <div className="daily-budget line-card frosted">
            <h2>Today's Budget</h2>
            <h3 className="daily-budgetJS">₹{parseInt(user.weekdayBudget)}</h3>
          </div>
          <div className="weekly-avg line-card frosted">
            <h2>Avg Daily Spending</h2>
            <h3 className="balanceJS">₹{parseInt(user.todaySpendings)}</h3>
          </div>
        </div>

        <div className="frosted card quote-box">
          <h2 className="budget grey-3 prog"><span className={`monthp ${perBudget >= perMonth ? "red" : "green"}-1`}>{perBudget}%</span> of monthly budget used.</h2>
          <h2 className="month grey-3 prog"><span>{perMonth}%</span> of the month over.</h2>
          <div className="card quote frosted">
            <span className="text" id="auto-quote">"A rupee saved is a rupee earned."</span>
            <span className="credits grey-3">-SpendWise</span>
          </div>
          <img src={squirrel} alt="SpendWise" />
        </div>
      </div>
      <div className="popup-overlay"></div>
      <AddTransPopup userId={user._id} fetchUserData={fetchUserData} />
    </div>
  );

}

export default HomePage;
