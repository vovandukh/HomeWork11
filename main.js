const login = document.querySelector('.login');
const password = document.querySelector('.password');
const email = document.querySelector('.email');
const EditUser = document.querySelector('.editUser');
const AddUser = document.querySelector('.addUser');
const arr = [];
let UserIndex;
const ADDUser = document.querySelector('.addUser');
ADDUser.addEventListener('click', () => {
    addUser();
    render();
});
const addUser = () => {
    class User {
        id;
        login;
        password;
        email;
        constructor(id, login, password, email) {
            this.id = id;
            this.login = login;
            this.password = password;
            this.email = email;
        }
    }
    const newUser = new User(arr.length, login.value, password.value, email.value);
    arr.push(newUser);
    login.value = '';
    password.value = '';
    email.value = '';
    console.log(newUser);
};
const render = () => {
    document.querySelector('tbody').innerHTML = '';
    arr.forEach(elem => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td></td>
        <td>${elem.login}</td>
        <td>${elem.password}</td> 
        <td>${elem.email}</td>
        <td> <div name="${elem.id}" class="edit">Edit</div></td> 
        <td><div name="${elem.id}" class="deleteUser">Delete</div></td>`;
        document.querySelector('tbody').appendChild(tr);
    });
    DeleteUser();
    editUser();
};
const DeleteUser = () => {
    let deleteUser = document.querySelectorAll('.deleteUser');
    deleteUser.forEach(elem => {
        elem.addEventListener('click', () => {
            let findInd = elem.getAttribute("name");
            let ind = arr.findIndex(el => el.id == findInd);
            arr.splice(ind, 1);
            render();
        });
    });
};
const editUser = () => {
    let Edit = document.querySelectorAll('.edit');
    Edit.forEach(elem => {
        elem.addEventListener('click', () => {
            let find = elem.getAttribute("name");
            let index = arr.findIndex(el => el.id == find);
            UserIndex = index;
            let values = Object.values(arr[index]);
            login.value = values[1];
            password.value = values[2];
            email.value = values[3];
            AddUser.style.display = 'none';
            EditUser.style.display = 'block';
        });
    });
};
const saveEditUser = () => {
    class saveUser {
        id;
        login;
        password;
        email;
        constructor(id, login, password, email) {
            this.id = id;
            this.login = login;
            this.password = password;
            this.email = email;
        }
    }
    const newSaveUser = new saveUser(arr.length, login.value, password.value, email.value);
    arr.splice(UserIndex, 1, newSaveUser);
    login.value = '';
    email.value = '';
    password.value = '';
    render();
};
EditUser.addEventListener('click', () => {
    saveEditUser();
});
