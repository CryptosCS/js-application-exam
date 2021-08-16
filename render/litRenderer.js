import { render } from "./../node_modules/lit-html/lit-html.js";

export class LitRenderer {
    constructor () {}

    createRenderer(domElement) {
        return function (template) {
            render(template, domElement);
        }
    }
}