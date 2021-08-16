import { createTemplate } from "./createTemplate.js";

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

async function submit(e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);

    let car = {};
    
    // add every field to car object
    formData.forEach(function (value, key) {
        if (value.trim() === '') {
            _form.errors.push(`${key} is required`);
            return;
        }
        car[key] = value;
    });

    car.price = parseInt(formData.get('price'));
    if (car.price < 1) {
        _form.errors.push('Price must be a positive number');
    }

    car.year = parseInt(formData.get('year'));
    if (car.year < 1) {
        _form.errors.push('Year must be a positive number');
    }

    // if validation 
    if (_form.errors.length < 1) {
        try {
            let result = await _carsService.create(car);
            return _router.redirect('/all-listings');
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

    let template = createTemplate(_form);
    _form.errors = [];
    _renderer(template);
}

export default {
    renderView,
    init
}