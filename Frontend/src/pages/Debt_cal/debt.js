import React, {useState} from "react";
import './debt.css';

/**
 * This is the page wherein the debt calculator functions are stored. There are two separate
 * calculators with separate fields and separate calculations. The first calculator is for
 * calculating the monthly payment required to be debt free by a certain date, while the second
 * calculator is for calculating the interest savings from making a lump sum payment today.
 */
function Debt() {

    // All these variables are either input variable or output variable from the calculator
    // that calculates the required monthly payment to be debt free by a certain date.
    const [debt1, setDebt1] = useState('');                     // Total amount owing
    const [interest1, setInterest1] = useState('');             // Annual interest rate as a percent
    const [surplusIncome, setSurplusIncome] = useState('');     // Average monthly surplus income
    const [date, setDate] = useState('');                       // Desired debt-free date
    const [monthlyPayment, setMonthlyPayment] = useState('');   // Field wherein output is displayed

    /**
     * The current function calculates the required monthly payment using the following formula:
     * ((365.25 / 12) * (debt / ((1 - (1 + dailyInterest) ** -(days)) / dailyInterest))).
     * The formula first computes the average number of days per month (365.25 / 12) and then
     * multiplies that by the debt divided by the annuity factor. The annuity factor is calculated
     * by dividing the total amount by the difference between 1 and the daily interest rate to the
     * power of the amount of days until the desired debt free date. This annuity factor is then
     * divided by the dailly interest rate to get the required monthly payment. Then, the output
     * field is updated to display the information to the user.
     */
    function calculate1() {
        var inputs = document.querySelectorAll("#DebtCalc1 input[required]")
        var flag = false;

        // Checks each input to ensure it is filled out properly. If not, the flag is set to true and
        // that input field is highlighted with a red border. After that, an alert is displayed to the
        // user to fill out all fields properly before returning false to abort the calculation. If the 
        // inputs are valid, the border is set to be normal.
        for (var x = 0; x < inputs.length; x++) {
            if (!inputs[x].value) {
                inputs[x].style.border = "2px solid red";
                flag = true;
            }

            else {
                inputs[x].style.border = "2px solid white";
            }
        }

        // If the flag is true, then an alert is displayed to the user to fill out all fields properly before returning
        // false to abort the calculation.
        if (flag) {
            alert("Please fill out all fields for the Monthly Payment Calculator.");
            setMonthlyPayment("");
            return false;
        }

        // Gets the current date and time and the desired debt free date and calculates the difference
        // between the two dates in days, rounding up where applicable.
        const now = new Date();
        const then = new Date(date);
        const days = Math.ceil((then - now) / (1000 * 60 * 60 * 24));

        // Gets the total amount owing, the annual interest rate, and calculates the required monthly payment to
        // be debt free by the desired date.
        const debt = parseFloat(debt1);
        const dailyInterest = (parseFloat(interest1) / 100) / 365.25;
        const monthlyPaymentCalc = ((365.25 / 12) * (debt / ((1 - (1 + dailyInterest) ** -(days)) / dailyInterest))).toFixed(2);

        // Calculates the difference between the required monthly payment and the surplus income. If the difference
        // is greater than 0, then the user cannot afford to pay off their debt by the desired date. Else, the user
        // can afford to pay off their debt by the desired date and the output field is updated to display the
        // required monthly payment. Otherwise, the output field is updated to show how long it would take to pay off
        // the debt if the user were to pay the full amount of their surplus income every month.
        const difference = (monthlyPaymentCalc - surplusIncome).toFixed(2);
        const daysToPay = Math.ceil((-(Math.log(1 - (dailyInterest / debt * parseFloat(surplusIncome))) / Math.log(1 + dailyInterest))) * (365.25 / 12));
        const newDebtFreeDate = new Date(now.getTime() + (daysToPay * 24 * 60 * 60 * 1000));

        if (difference > 0) {
            setMonthlyPayment("To be debt free by this date, you would need to pay about $" + monthlyPaymentCalc.toString() + " a month. " +
            "It looks like this is about $" + difference.toString() + " more than you can afford per month " +
            "given your surplus income. If you were to pay $" + surplusIncome.toString() + " a month, you would be debt free by " 
            + newDebtFreeDate.toDateString() + ".");
        }

        else {setMonthlyPayment("To be debt free by this date, you would need to pay about $" + monthlyPaymentCalc.toString() + " a month.");}
    }

    // All these variables are either input variable or output variable from the calculator
    // that calculates the interest savings from making a lump sum payment today.
    const [debt2, setDebt2] = useState('');                             // The total amount owing
    const [interest2, setInterest2] = useState('');                     // Annual interest rate as a percent
    const [lumpSum, setLumpSum] = useState('');                         // The lump sum payment
    const [term, setTerm] = useState('');                               // Whether the interest is annual or monthly
    const [interestReduction, setInterestReduction] = useState('');     // Field wherein output is displayed

    /**
     * This function calculates the interest savings from making a lump sum payment today using the following formula:
     * (debt * (interest / 100)) - ((debt - lumpSum) * (interest / 100)). The formula first calculates the interest
     * that would be paid on the debt before the lump sum payment and then calculates the interest paid on the debt 
     * after the lump sum payment and displays the difference between the two in the output field.
     */
    function calculate2() {
        var inputs = document.querySelectorAll("#DebtCalc2 input[required]")
        var flag = false;

        // Checks if all fields are filled out properly. If not, the flag is set to true and the input field is
        // highlighted with a red border. If they are valid, then their border is returned to normal.
        for (var x = 0; x < inputs.length; x++) {
            if (!inputs[x].value) {
                inputs[x].style.border = "2px solid red";
                flag = true;
            }

            else {
                inputs[x].style.border = "2px solid white";
            }
        }

        // Check if the interest term is selected. If not, the flag is set to true and the input field is highlighted
        // with a red border.
        if (term === 'undefined' || term === '') {
            document.getElementById("interestTerm").style.border = "2px solid red";
            flag = true;
        }

        // If the input is valid, then the border is returned to normal.
        else {
            document.getElementById("interestTerm").style.border = "2px solid white";
        }

        // If the flag is true, then an alert is displayed to the user to fill out all fields properly before returning
        // false to abort the calculation.
        if (flag) {
            alert("Please fill out all fields for the Interest Reduction Calculator.");
            setInterestReduction("");
            return;
        }

        const debt = parseFloat(debt2);                                 // Total amount owing
        
        // Calculates the interest savings based on whether the interest is annual or monthly and displays
        // the output to the user.
        if (term === 'annual') {
            const oldInterest = debt * (interest2 / 100);
            const newInterest = (debt - lumpSum) * (interest2 / 100);
            const interestDiff = oldInterest - newInterest;
            setInterestReduction("If you were to make a lump sum payment of $" + parseFloat(lumpSum).toFixed(2).toString() +
            " today, you would save a total of $" + interestDiff.toFixed(2) + " a year in interest costs.");
        }

        else {
            const oldInterest = (debt * (interest2 / 100)) / 12;
            const newInterest = ((debt - lumpSum) * (interest2 / 100)) / 12;
            const interestDiff = oldInterest - newInterest;
            setInterestReduction("If you were to make a lump sum payment of $" + parseFloat(lumpSum).toFixed(2).toString() +
            " today, you would save a total of $" + interestDiff.toFixed(2) + " a month in interest costs.");
        }
    }
    

    // A quick helper function to validate if a number is valid. If it is not, then an alert is displayed
    // to the user and the value is set to an empty string.
    function validateNumber(value) {
        if (isNaN(value)) {
            alert("Please enter a valid number.");
            value = "";
            return false;
        }

        else if (value < 0) {
            alert("Please enter a positive number.");
            value = "";
            return false;
        }

        else if (value === "") {
            return false;
        }

        return true;
    }

    // A quick helper function to validate if an interest rate is valid. If it is not, then an alert is displayed
    // to the user and the value is set to an empty string.
    function validateInterest(value) {
        if (isNaN(value)) {
            alert("Please enter a valid number.");
            value = "";
            return false;
        }

        else if (value < 0 || value > 100) {
            alert("Please enter a valid interest rate between 0 and 100.");
            value = "";
            return false;
        }

        else if (value === "") {
            return false;
        }

        return true;
    }

    // A quick helper function to validate if a date is valid. If it is not, then an alert is displayed
    // to the user.
    function validateDate(date) {
        const now = new Date();
        const then = new Date(date);

        if (then < now) {
            alert("Please enter a date in the future.");
            return false;
        }

        return true;
    }

    /**
     * The following code is the HTML code for the debt calculator page. It contains two forms, one for each
     * calculator. Each form contains input fields for the user to enter their information and a button to
     * calculate the output. The output is displayed in a textarea field that is read only.
     */
    return (
        <div id="DebtCalculatorPage">
            <div id="DebtContainer">
                <form id="DebtCalc1">
                    <h1 id="DebtCalcHeading1">Monthly Payment</h1>

                    <label for="debt1">Total Amount Owing</label><br></br>
                    <input type="number" id="debt1" name="debt1" value={debt1} 
                    onChange={(e) => setDebt1(parseFloat(e.target.value))}
                    onBlur={(e) => {if (validateNumber(e.target.value)) setDebt1(parseFloat(e.target.value).toFixed(2))
                                    else setDebt1('')}} 
                    placeholder="Enter total amount owing..." required min="0"></input><br></br>

                    <label for="interest1">Interest Rate (Annual)</label><br></br>
                    <input type="number" id="interest1" name="interest1" value={interest1} 
                    onChange={(e) => setInterest1(parseFloat(e.target.value))} 
                    onBlur={(e) => {if (validateInterest(e.target.value)) setInterest1(parseFloat(e.target.value).toFixed(2))
                                    else setInterest1('')}}
                    placeholder="Enter interest rate (22.9 = 22.9% interest)" required min="0"></input><br></br>

                    <label for="surplusIncome">Surplus Income (Monthly)</label><br></br>
                    <input type="number" id="surplusIncome" name="surplusIncome" value={surplusIncome} 
                    onChange={(e) => setSurplusIncome(parseFloat(e.target.value))} 
                    onBlur={(e) => {if (validateNumber(e.target.value)) setSurplusIncome(parseFloat(e.target.value).toFixed(2))
                                    else setSurplusIncome('')}}
                    placeholder="Enter monthly surplus income..." required min="0"></input><br></br>

                    <label for="date">Desired Debt-Free Date</label><br></br>
                    <input type="date" id="date" name="date" value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    onBlur={(e) => {if (validateDate(e.target.value)) setDate(e.target.value)}} required></input><br></br>

                    <button type="button" onClick={calculate1}>Calculate</button><br></br>

                    <div id="DebtCalc1Output">
                        <h3 id="monthlyPayment">Required Monthly Payment</h3><br></br>
                        <p id="monthlyPayment">{monthlyPayment}</p>
                    </div>
                </form>

                <form id="DebtCalc2">
                    <h1 id="DebtCalcHeading2">Interest Reduction</h1>

                    <label for="debt2">Total Amount Owing</label><br></br>
                    <input type="number" id="debt2" name="debt2" value={debt2} 
                    onChange={(e) => setDebt2(parseFloat(e.target.value))}
                    onBlur={(e) => {if (validateNumber(e.target.value)) setDebt2(parseFloat(e.target.value).toFixed(2))
                                    else setDebt2('')}} 
                    placeholder="Enter total amount owing..." required min="0"></input>
                    <br></br>

                    <label for="interest2">Interest Rate (Annual)</label><br></br>
                    <input type="number" id="interest2" name="interest2" value={interest2} 
                    onChange={(e) => setInterest2(parseFloat(e.target.value))} 
                    onBlur={(e) => {if (validateInterest(e.target.value)) setInterest2(parseFloat(e.target.value).toFixed(2))
                                    else setInterest1('')}}
                    placeholder="Enter interest rate (22.9 = 22.9% interest)" required min="0"></input>
                    <br></br>

                    <label for="lumpSum">Lump Sum Payment</label><br></br>
                    <input type="number" id="lumpSum" name="lumpSum" value={lumpSum}
                    onChange={(e) => setLumpSum(parseFloat(e.target.value))}
                    onBlur={(e) => {if (validateNumber(e.target.value)) setLumpSum(parseFloat(e.target.value).toFixed(2))
                                    else setLumpSum('')}}
                    placeholder="Enter lump sum payment..." required min="0"></input>
                    <br></br>

                    <label for="interestTerm">Annual or Monthly Interest</label><br></br>
                    <select id="interestTerm" name="interestTerm" value={term} required 
                    onChange={(e) => setTerm(e.target.value)}>
                        <option value="undefined">Select...</option>
                        <option value="annual">Annual</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <br></br>

                    <button type="button" onClick={calculate2}>Calculate</button><br></br>
                    
                    <div id="DebtCalc2Output">
                        <h3 id="interestReduction">Reduction in Interest Cost</h3><br></br>
                        <p id="interestReduction">{interestReduction}</p>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Debt;