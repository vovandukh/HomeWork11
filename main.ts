const login = (<HTMLInputElement>document.querySelector('.login'));
const password = (<HTMLInputElement>document.querySelector('.password'));
const email = (<HTMLInputElement>document.querySelector('.email'));
const EditUser = (<HTMLLIElement>document.querySelector('.editUser'));
const AddUser = (<HTMLLIElement>document.querySelector('.addUser'));
const arr: Array<IUser> = [];
let UserIndex : number;


interface IUser {
    id: number,
    login: string,
    password: string,
    email: string
}

const ADDUser = document.querySelector('.addUser');

ADDUser.addEventListener('click', () => {
    addUser();
    render();
})

const addUser = () : void => {
    class User implements IUser {
        public id: number;
        public login: string;
        public password: string;
        public email: string;
        constructor(id: number, login: string, password: string, email: string) {
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
}

const render = () : void => {
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
}



const DeleteUser = () : void => {
    let deleteUser = document.querySelectorAll('.deleteUser');
    deleteUser.forEach(elem => {
        elem.addEventListener('click', () => {
            let findInd :any = elem.getAttribute("name");
            let ind = arr.findIndex(el => el.id == findInd);
            arr.splice(ind, 1)
            render();
        })

    })
   
}

const editUser = () : void =>{
    let Edit = document.querySelectorAll('.edit');
    Edit.forEach(elem =>{
        elem.addEventListener('click',()=>{
            let find :any = elem.getAttribute("name");
            let index = arr.findIndex(el => el.id == find);
            UserIndex = index;
            let values = Object.values(arr[index])
            login.value = values[1];
            password.value = values[2];
            email.value = values[3];
            AddUser.style.display = 'none';
            EditUser.style.display = 'block';
        })
    })
}

const saveEditUser = () :void => {

    class saveUser implements IUser {
        public id: number;
        public login: string;
        public password: string;
        public email: string;
        constructor(id:number,login:string,password:string,email:string){
            this.id = id;
            this.login = login;
            this.password = password
            this.email = email;
        }
    }
    const newSaveUser = new saveUser(arr.length,login.value,password.value,email.value);
    arr.splice(UserIndex,1,newSaveUser);
    login.value = '';
    email.value = '';
    password.value = '';
    render();

} 


EditUser.addEventListener('click',()=>{
    saveEditUser();
})

