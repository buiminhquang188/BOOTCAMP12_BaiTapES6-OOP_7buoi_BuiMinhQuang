export default class ToDoListServices {
    fetchList = () => {
        return axios({
            url: 'https://60eec015eb4c0a0017bf45ee.mockapi.io/toDoList',
            method: 'GET'
        })
    }
    postList = list => {
        return axios({
            url: 'https://60eec015eb4c0a0017bf45ee.mockapi.io/toDoList',
            method: 'POST',
            data: list
        })
    }
    deleteList = id => {
        return axios({
            url: `https://60eec015eb4c0a0017bf45ee.mockapi.io/toDoList/${id}`,
            method: 'DELETE'
        })
    }
    updateList = (id, nd) => {
        return axios({
            url: `https://60eec015eb4c0a0017bf45ee.mockapi.io/toDoList/${id}`,
            method: 'PUT',
            data: nd
        })
    }
}