import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderer = undefined;
let _auth = undefined;
let _form = undefined;
let _carsService = undefined;

function init(router, renderer, auth, carsService) {
    _router = router;
    _renderer = renderer;
    _auth = auth;
    _carsService = carsService;
    _form = {
        submit,
        errors: []
    }
}

async function submit(id, e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);

    let car = {};

    formData.forEach(function (value, key) {
        if (value.trim() === '') {
            _form.errors.push(`${key} is required`);
            return;
        }
        car[key] = value;
    });

    car.price = parseInt(formData.get('price'));
    if (car.price < 0) {
        _form.errors.push('Price must be a positive number');
    }

    car.year = parseInt(formData.get('year'));
    if (year < 0) {
        _form.errors.push('Year must be a positive number');
    }

    if (_form.errors.length < 1) {
        try {
            let result = await _carsService.update(id, car);
            return _router.redirect('/details/' + id);
        } catch (ex) {
            _form.errors.push(ex)
        }
    }

    alert(_form.errors.join('\n'))
    renderView();
}

async function renderView(context) {
    if (context.user === undefined) {
        return _router.redirect('/login');
    }
    
    let car = await _carsService.get(context.params.id);

    if (context.user._id !== car._ownerId) {
        return _router.redirect('/all-listings');
    }

    let model = {
        car,
        submit,
        form: _form
    };

    let template = editTemplate(model);
    _form.errors = [];
    _renderer(template);
}

export default {
    renderView,
    init
}