import { navTemplate } from "./navTemplate.js";

let _router = undefined;
let _renderer = undefined;
let _auth = undefined;

function init(router, renderer, auth) {
    _router = router;
    _renderer = renderer;
    _auth = auth;
}

async function logoutHandler() {
    await _auth.logout();
    _router.redirect('/home');
}

async function renderView(context, next) {
    let user = _auth.getUser();

    let navContext = {
        isLoggedIn: user !== undefined,
        username: user !== undefined ? user.username : undefined,
        logoutHandler
    };

    let template = navTemplate(navContext);
    _renderer(template);
    next();
}

export default {
    renderView,
    init
}