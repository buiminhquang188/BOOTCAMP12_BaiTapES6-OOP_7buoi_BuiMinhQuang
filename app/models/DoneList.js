import List from "./List.js";

export default class DoneList extends List {
    constructor(id, toDoType, content) {
        super(id, toDoType, content);
    }
    renderList() {
        return document.getElementById('completed').innerHTML += `
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled>
        <label class="form-check-label" for="flexCheckCheckedDisabled">
            ${this.content}
        </label>
      </div>
        `
    }
}