import { request } from "../helpers/requester.js";

let baseUrl = 'http://localhost:3030/users';

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(getUser());
}

function getUser() {
    let user = localStorage.getItem('user') === null
        ? undefined
        : JSON.parse(localStorage.getItem('user'));

    return user;
}

async function login(user) {
    let result = await request(`${baseUrl}/login`, 'POST', user);
    setUser(result);
}

async function register(user) {
    let result = await request(`${baseUrl}/register`, 'POST', user);
    setUser(result);
}

async function logout(user) {
    await request(`${baseUrl}/logout`, 'GET', undefined, true, true);
    localStorage.clear();
    
}

function addUserToContext(context, next) {
    context.user = getUser();
    next();
}

export default {
    setUser,
    getUser,
    login,
    register,
    logout,
    addUserToContext
}