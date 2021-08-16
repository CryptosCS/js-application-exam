import { listingTemplate } from "./listingTemplate.js";

let _router = undefined;
let _renderer = undefined;
let _auth = undefined;
let _carsService = undefined;

function init(router, renderer, auth, carsService) {
    _router = router;
    _renderer = renderer;
    _auth = auth;
    _carsService = carsService;
}

async function renderView(context) 
{
    let cars = await _carsService.getAll();
    let template = listingTemplate(cars);
    _renderer(template);
}

export default {
    renderView,
    init
}