import React, { Component, useEffect } from 'react'
import { X, Plus, Minus } from 'lucide-react';
import $ from 'jquery';

function AddTransPopup({ userId, fetchUserData }) {
    const API_URL = 'http://192.168.145.176:3000';
    useEffect(() => {
        $(".add-trans").click(function () {
            $(".popup-overlay").fadeIn("fast");
            $(".add-trans-box").show();
            $(".add-trans-box").animate({ opacity: 1, marginTop: 0 }, 300);
        });
        $(".add-trans-box .close, .popup-overlay, .add-trans-box .cancel").on("click", function () {

            $(".add-trans-box").animate({ opacity: 0, marginTop: "100px" }, 300);
            $(".popup-overlay").fadeOut("fast");
            $(".add-trans-box").hide();
        });

        $(".add-trans-box .plus").click(function () {
            $(".add-trans-box .plus").addClass("active");
            $(".add-trans-box .minus").removeClass("active");
        });

        $(".add-trans-box .minus").click(function () {
            $(".add-trans-box .minus").addClass("active");
            $(".add-trans-box .plus").removeClass("active");
        });



    }, []);
    useEffect(() => {
        // $(".add-trans").clickz
    }, []);
    function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission

        var amount = parseFloat($("#add-trans-form #amount").val());
        const title = $("#add-trans-form #title").val();
        const description = $("#add-trans-form #desc").val();
        const pay_type = $("#add-trans-form #options").val();

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid transaction amount. ' + amount);
            return;
        }
        if ($(".add-trans-box .minus").hasClass("active")) amount *= -1;
        // Assuming you have the user's ID available as `userId`

        fetch(API_URL + '/api/update-balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, amount, title, description, pay_type })
        })
            .then(response => response.json())
            .then(data => {
                $(".add-trans-box").animate({ opacity: 0, marginTop: "100px" }, 300);
                $(".popup-overlay").fadeOut("fast");
                $(".add-trans-box").hide();
                // refresh();
                fetchUserData();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }
    return (
        <div className="add-trans-box modal frosted white-1 host-grotesk">
            <div className="close inline"><X /></div>
            <div className="btns-1">
                <div className="plus btn"><Plus /></div>
                <div className="minus active btn"><Minus /></div>
            </div>
            <form id="add-trans-form" onSubmit={handleSubmit}>
                <div>
                    <textarea id="title" placeholder="Title: Daily Payment..."></textarea>
                    <input id="amount" type="number" placeholder="0.00" min="0.01" step="0.01" required />
                    <textarea id="desc" placeholder="Enter description..."></textarea>
                </div>
                <div className="paymethod">
                    <label htmlFor="options">Payment Mode:</label>
                    <select id="options" name="options" required>
                        <option value="UPI" >UPI</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <div className="btns-2">
                    <button type="reset" className="cancel">Cancel</button>
                    <button type="submit" className="add">Add</button>
                </div>
            </form>
        </div>
    )

}

export default AddTransPopup
