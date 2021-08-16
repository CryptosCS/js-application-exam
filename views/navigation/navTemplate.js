import { html } from "./../../node_modules/lit-html/lit-html.js";

export let navTemplate = (context) => html`
    <nav>
        <a class="active" href="/home">Home</a>
        <a href="/all-listings">All Listings</a>
        <a href="/search">By Year</a>

        ${context.isLoggedIn
        ? loggedInTemplate(context) 
        : guestTemplate()}   
    </nav>`;

let loggedInTemplate = (context) => html`
    <div id="profile">
        <a>Welcome ${context.username}</a>
        <a href="/profile">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="javascript:void(0)" @click=${context.logoutHandler}>Logout</a>
    </div>`;

let guestTemplate = () => html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`;
