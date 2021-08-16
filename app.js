// libs
import page from "./node_modules/page/page.mjs";
import { LitRenderer } from "./render/litRenderer.js";

// Views
import homeView from "./views/home/homeView.js";
import navView from "./views/navigation/navView.js";
import loginView from "./views/login/loginView.js";
import listingView from "./views/listing/listingView.js";
import registerView from "./views/register/registerView.js";
import createView from "./views/create/createView.js";
import detailsView from "./views/details/detailsView.js";
import editView from "./views/edit/editView.js"

// Services
import authService from "./services/authService.js";
import carsService from "./services/carsService.js";

let renderer = new LitRenderer();

// get DOM elements' renderers
let navigationElement = document.getElementById('navigation');
let rootElement = document.getElementById('site-content');

let navRenderer = renderer.createRenderer(navigationElement);
let appRenderer = renderer.createRenderer(rootElement);

// inject dependencies
navView.init(page, navRenderer, authService);
homeView.init(page, appRenderer, authService);
loginView.init(page, appRenderer, authService);
listingView.init(page, appRenderer, authService, carsService);
createView.init(page, appRenderer, authService, carsService);
registerView.init(page, appRenderer, authService);
detailsView.init(page, appRenderer, authService, carsService);
editView.init(page, appRenderer, authService, carsService);

// routing
page('/index.html', '/home');
page('/', '/home');

page(authService.addUserToContext);

page(navView.renderView);
page('/home', homeView.renderView);
page('/login', loginView.renderView);
page('/all-listings', listingView.renderView);
page('/register', registerView.renderView);
page('/create', createView.renderView);
page('/details/:id', detailsView.renderView);
page('/edit/:id', editView.renderView);

page.start();