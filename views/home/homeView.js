import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderer = undefined;
let _auth = undefined;

function init(router, renderer, auth) {
    _router = router;
    _renderer = renderer;
    _auth = auth;
}

async function renderView(context) {
    let template = homeTemplate();
    _renderer(template);
}

export default {
    renderView,
    init
}