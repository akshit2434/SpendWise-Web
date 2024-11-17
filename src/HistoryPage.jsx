import React from 'react'
import AddTransPopup from './AddTransPopup';

function formatDate(date) {
    date = new Date(date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

}

export default function HistoryPage({ transactions, userId, fetchUserData }) {
    if (!transactions) return <p>No data passed...</p>

    var elements = [];
    var count = 0;
    for (var trans of transactions) {
        count++;
        var amount = trans.amount;
        var color = (amount > 0) ? "green" : "red";
        if (amount < 0) amount *= -1;
        var sign = (color == "green") ? "+" : "-";
        var title = trans.title;
        var date = formatDate(trans.date);
        elements.push(<div key={trans._id} className="transaction frosted white-1">
            <span className={`amount ${color}-1`}>
                {sign}₹{amount}
            </span>
            <i data-lucide="circle-user-round"></i>
            <div>
                <span className="name">{title}</span>
            </div>
            <span className="date">{date}</span>
        </div>
        );
    }
    if (count == 0) {
        elements.push(<h1 key="0">No Transactions...</h1>);
    }
    return (
        <div className="wrapper wrapper_dues">
            <h1>Transactions</h1><hr /><br /><br />
            {elements}
            <AddTransPopup userId={userId} fetchUserData={fetchUserData} />
        </div>
    )
}
