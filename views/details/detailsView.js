import { detailsTemplate } from "./detailsTemplate.js";

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

async function deleteHandler(id, e) {
    try {
        if (confirm('Are you sure you want to delete this car?')) {
            let result = await _carsService.deleteItem(id);
            _router.redirect('/all-listings');
        }
    } catch (ex) {
        alert(ex);
    }
}

async function renderView(context) {
    let id = context.params.id;
    let car = await _carsService.get(id);
    let user = context.user;
    let userId = user !== undefined ? user._id : undefined;

    let model = {
        car,
        user,
        isOwner: car._ownerId === userId,
        deleteHandler
    };

    let template = detailsTemplate(model);
    _renderer(template);
}

export default {
    renderView,
    init
}