import { request } from "../helpers/requester.js";

let baseUrl = 'http://localhost:3030/data/cars';

async function getAll() {
    let result = await request(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
}

async function get(id) {
    let result = await request(`${baseUrl}/${id}`);
    return result;
}

async function create(car) {
    let result = await request(`${baseUrl}`, 'POST', car, true);
    return result;
}

async function update(id, car) {
    let result = await request(`${baseUrl}/${id}`, 'PUT', car, true);
    return result;
}

async function deleteItem(id) {
    let result = await request(`${baseUrl}/${id}`, 'DELETE', undefined, true);
    return result
}

export default {
    getAll,
    get,
    create,
    update,
    deleteItem
}