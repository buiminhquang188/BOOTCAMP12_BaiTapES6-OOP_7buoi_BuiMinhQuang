import List from "./List.js";

export default class DoList extends List {
    constructor(id, toDoType, content) {
        super(id, toDoType, content);
    }
    renderList() {
        return document.getElementById('todo').innerHTML += `
        <div class="form-check py-1 container">
            <div class="row">
                <div class="col-9">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheck-${this.id}">
                    <label class="form-check-label" for="flexCheck-${this.id}">
                        ${this.content}
                    </label>
                </div>
                <div class="col-3">
                    <button class="btn btn-danger" onclick="deleteList(${this.id})">Xoá</button>
                </div>
                </div>
        </div>
        `
    }
}