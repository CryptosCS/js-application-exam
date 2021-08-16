import { registerTemplate } from "./registerTemplate.js";

let _router = undefined;
let _renderer = undefined;
let _auth = undefined;
let _form = undefined;

function init(router, renderer, auth) {
    _router = router;
    _renderer = renderer;
    _auth = auth;
    _form = {
        submit,
        errors: []
    }
}

async function submit(e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);

    let username = formData.get('username');
    let password = formData.get('password');
    let repeatPass = formData.get('repeatPass');

    if (username.trim() === '') {
        _form.errors.push('Username is required');
    }
    if (password.trim() === '') {
        _form.errors.push('Password is required');
    }
    if (repeatPass !== password) {
        _form.errors.push('Both passwords must be the same');
    }

    if (_form.errors.length < 1) {
        let user = {
            username,
            password
        }

        try {
            let register = await _auth.register(user);
            _router.redirect('/all-listings');
        } catch (ex) {
            _form.errors.push(ex)
        }
    }

    if (_form.errors.length > 0) {
        alert(_form.errors.join('\n'))
        renderView();
        return false;
    }
}


async function renderView(context) {
    let template = registerTemplate(_form);
    _form.errors = [];
    _renderer(template);
}

export default {
    renderView,
    init
}