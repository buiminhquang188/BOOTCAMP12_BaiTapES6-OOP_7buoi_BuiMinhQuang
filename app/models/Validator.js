function Validator() {
    this.kiemTraRong = function (value, showPlace, mess) {
        if (!value) {
            document.getElementById(showPlace).style.display = 'block';
            document.getElementById(showPlace).innerHTML = mess;
            return false;
        }
        else {
            document.getElementById(showPlace).style.display = 'none';
            document.getElementById(showPlace).innerHTML = '';
            return true;
        }
    }
}