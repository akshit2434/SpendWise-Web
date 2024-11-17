import React from 'react';
import './styles/dues.css';
import AddDuesPopup from './AddDuesPopup';

export default function DuesPage({ dues, userId, fetchUserData }) {
    if (!dues) return <p>No data passed...</p>

    var people = [];
    var count = 0;
    for (var person of dues) {
        count++;
        var amount = person.balance;
        var color = (amount < 0) ? "green" : "red";
        if (amount < 0) amount *= -1;
        var sign = (color == "green") ? "Take " : "Give ";
        var title = person.name;
        people.push(<div className="transaction frosted white-1" key={person._id}><span className={`amount ${color}-1`}>{sign} ₹{amount}</span><i data-lucide='circle-user-round'></i><div><span className='name'>{title}</span></div></div>);
    }
    if (count == 0) {
        people.push(<h1 key={'1'}>No Dues...</h1>);
    }
    return (
        <div className="wrapper wrapper_dues">
            <h1>Dues</h1><hr /><br /><br />
            {people}
            <AddDuesPopup userId={userId} fetchUserData={fetchUserData} />
        </div>
    )
}
