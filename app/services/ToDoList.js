export default class ArrList {
    constructor() {
        this.arrList = [];
    }
    addToList(list) {
        this.arrList = [...this.arrList, list];
    }
    sortAZ() {
        this.arrList.sort((a, b) => {
            let fa = a.content.toLowerCase(),
                fb = b.content.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    }
    sortZA() {
        this.arrList.sort((a, b) => {
            let fa = a.content.toLowerCase(),
                fb = b.content.toLowerCase();

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
    }
}