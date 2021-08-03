import ToDoListServices from "../services/ToDoListServices.js";
import DoneList from "../models/DoneList.js";
import DoList from '../models/DoList.js'
import ArrList from "../services/ToDoList.js";

const toDoListServices = new ToDoListServices();
const validator = new Validator();
const arrList = new ArrList();


var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

document.getElementById("dateCurrent").innerHTML = dateTime;

// Lấy dữ liệu từ mockAPI về
const fetchList = () => {
    toDoListServices
        .fetchList()
        .then(res => {
            renderList(res.data);
        })
        .catch(err => {
            alert(err);
        })
}

fetchList();

// In danh sách các công việc
const renderHTML = () => {
    let content = '';
    document.getElementById('todo').innerHTML = content;
    document.getElementById('completed').innerHTML = content;
    arrList.arrList.map((list, index) => {
        content += `
            ${list.renderList()}
        `
    })
}

// Chia đối tượng ra làm 2 1 là DoList(Danh sách các công việc chưa làm), 2 là DoneList(Danh sách các công việc làm rồi)
const renderList = (listData) => {
    arrList.arrList = [];
    listData.map(list => {
        const { id, toDoType, content } = list;
        switch (toDoType) {
            case 1:
                const doList = new DoList(+id, toDoType, content);
                arrList.addToList(doList);
                break;
            case 2:
                const doneList = new DoneList(+id, toDoType, content);
                arrList.addToList(doneList);
                break;
            default:
                alert('Invalid toDoType');
                break;
        }
    })
    renderHTML();
}

// Thêm nội dung cần note vào
const postList = (list) => {
    toDoListServices
        .postList(list)
        .then(res => {
            fetchList();
            alert('Thêm vào danh sách thành công');
            document.getElementById('newTask').value = '';
        })
        .catch(err => {
            alert(err)
        })
}

// DOM tới vị trí nhập, validation
const addItem = () => {
    const content = document.getElementById('newTask').value;
    let isValid = true;
    isValid = validation(isValid, content);
    if (!isValid) {
        return;
    }
    const list = new DoList(null, 1, content);
    postList(list);
}
document.getElementById('addItem').addEventListener('click', addItem)

// Validate trường hợp người dùng nhập rỗng
const validation = (isValid, content) => {
    isValid = validator.kiemTraRong(content, 'tbAddItem', '(*) Bạn không được để trống phần này');
    return isValid;
}

// Xoá một công việc nào đó bằng cách cho id vào
const deleteList = (id) => {
    debugger
    toDoListServices
        .deleteList(id)
        .then(res => {
            fetchList();
            alert('Xoá thành công');
        })
        .catch(err => {
            alert(err)
        })
}
window.deleteList = deleteList;

// Sắp xếp theo chữ cái từ A - Z
const sortAZ = () => {
    arrList.sortAZ();
    renderHTML();
}

// Sắp xếp theo chữ cái từ Z - A
const sortZA = () => {
    arrList.sortZA();
    renderHTML();
}
// DOM tới vị trí nút nhấn sắp xếp và thêm sự kiện nhấn
document.getElementById('two').addEventListener('click', sortAZ);
document.getElementById('three').addEventListener('click', sortZA);

// Kiểm tra xem người dùng có nhập dấu tích không
const checkType = () => {
    arrList.arrList.map((list, idx) => {
        // bóc tách phần tử
        const { id, toDoType, content } = list;
        // nếu dấu tích loại 1(chưa xong công việc đó) thì mới kiểm tra
        if (toDoType === 1) {
            // nối chuỗi với id để thay đổi label và input checkbox
            let stringID = 'flexCheck-' + id;
            let checkBox = document.getElementById(stringID)
            // nếu checkbox được tích thì đẩy data update mới vào DoneList và cập nhật lên mockAPI
            if (checkBox.checked) {
                let update = new DoneList(id, 2, content)
                toDoListServices.
                    updateList(id, update)
                    .then(res => {
                        fetchList();
                        renderHTML();
                        alert('Đã cập nhật xong')
                    })
                    .catch(err => {
                        alert(err);
                    })
            }
        }
        else {
            alert('Không có công việc nào cần được hoàn thành');
            return;
        }
    })
}

// Thêm sự kiện cho nút check
document.getElementById('one').addEventListener('click', checkType)

