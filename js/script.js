//Format date
let today = document.querySelectorAll('.today');
function formatDate() {
    const now = new Date();
    const day = now.getDay();
    const month = now.getMonth();
    const year = now.getFullYear();
    //
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    //
    const str_day = now.toDateString();
    // Định dạng thành chuỗi dd/mm/yyyy hh:mm:ss
    const formattedDateTime =
        `${str_day} - ` +
        // `${day.toString().padStart(2, '0')}/` +
        // `${month.toString().padStart(2, '0')}/` +
        // `${year} ` +
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;

    return formattedDateTime;
}
function updateDate() {
    today.forEach((e) => {
        e.textContent = formatDate();
    });
}
setInterval(updateDate, 1000);

//Get name
let nameUser = localStorage.getItem('currentUser');
let name = document.querySelector('.sidebar__name');
name.textContent = nameUser;

//Logout
let sidebarLogout = document.querySelector('.sidebar__logout');
sidebarLogout.addEventListener('click', function (e) {
    e.preventDefault();

    localStorage.removeItem('currentUser');

    window.location.href = 'login.html';
});

//Show data: http://localhost:3000/...
let allTasks = [];
async function getTasks() {
    try {
        let res = await fetch('http://localhost:3000/tasks');
        if (res.ok) {
            allTasks = await res.json();
            if (allTasks) {
                updateDashboard(allTasks);
                renderTasks(allTasks);
                renderTasksDetail(allTasks);
                randomColor(allTasks);
                checkTask();
            }
        }
    } catch (error) {
        console.log(error);
    }
}
//Render tasks
function updateDashboard(tasks) {
    //total-done-active
    let total = document.querySelector('.tasks-total');
    let done = document.querySelector('.tasks-done');
    let active = document.querySelector('.tasks-active');

    let tasksDone = tasks.filter(t => t.status == 'done');
    let tasksActive = tasks.filter(t => t.status == 'active');

    total.textContent = tasks.length;
    done.textContent = tasksDone.length;
    active.textContent = tasksActive.length;
}


function renderTasks(tasks) {
    //list tasks
    let sidebarTasks = document.querySelector('.sidebar__tasks');
    sidebarTasks.innerHTML = '';
    //Render tasks basic
    tasks.forEach((t) => {
        sidebarTasks.innerHTML += `
            <div class="sidebar__tasks-date">
                ${t.startDate}
            </div>
            <li class="sidebar__item">
                <div class="sidebar__item-time">
                    <p>${t.startTime}</p>
                    <span>${t.description}</span>
                </div>
                
                <div class="sidebar__item-content">
                    ${t.title}
                </div>
            </li>
        `;
    });
}

// render tasks detail
function renderTasksDetail(tasks) {
    let taskItem = document.querySelector('.taskList');
    taskItem.innerHTML = '';
    //<!-- <i class="fa-solid fa-bookmark"></i> có lưu fa-regular không lưu -->
    tasks.forEach((t) => {
        taskItem.innerHTML += `
        <div class="taskItem" data-id=${t.id}>
            <div class="taskHeader">
                <span>
                    ${t.title}
                </span>
                <div class="taskActions">
                    <i class="btn-check ${t.status === 'active' ? 'fa-regular fa-circle' : 'fa-solid fa-circle-check'} "></i>
                    <i class="fa-regular fa-pen-to-square btn-edit" data-page="edit-task" data-id="${t.id}"></i>
                    <i class="${t.isFavorite ? 'fa-solid' : 'fa-regular'} fa-bookmark btn-favorite"></i>
                    <i class="fa-solid fa-circle-minus btn-delete"></i>
                    <i class="fa-solid fa-caret-down btn-detail"></i>
                </div>
            </div>
            <div class="taskDetail">
                <p class="task-detail__description">Description: ${t.description}</p>
                <p class="task-detail__status">Status: ${t.status}</p>
                <p class="task-detail__created">Created: ${t.createdAt}</p>
                <p class="task-detail__start">Start: ${t.startDate}</p>
                <p class="task-detail__time">Time: ${t.startTime}</p>
                <p class="task-detail__deadline">Deadline: ${t.deadline}</p>
            </div>
        </div>
    `
    });
}


//const today = new Date().toISOString().split('T')[0]; lấy ngày hiện tại, nếu task.startDate === today thì lấy, filter
//new Date(task.startDate) < today lọc ngày trước hôm nay, filter
//new Date(task.startDate) > today lọc ngày sau hôm nay, filter
/**
 *  tasks.sort((a, b) =>
    new Date(a.startDate) -
    new Date(b.startDate)
    ); xắp xếp gần xa
 */
//Get tasks today
function filterToday(tasks) {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(t => t.startDate === today);
}

//Get tasks past
function filterPass(tasks) {
    const today = new Date();
    return tasks.filter(t => new Date(t.startDate) < today);
}

//Get tasks future
function filterFuture(tasks) {
    const today = new Date();
    return tasks.filter(t => new Date(t.startDate) > today);
}

//Get tasks done
function filterDone(tasks) {
    return tasks.filter(t => t.status === 'done');
}

//Get tasks active
function filterActive(tasks) {
    return tasks.filter(t => t.status === 'active');
}

//Apply filter
function applyFilter(optionValue) {
    switch (optionValue) {
        case 'today':
            return filterToday(allTasks);
            break;

        case 'past':
            return filterPass(allTasks);
            break;

        case 'future':
            return filterFuture(allTasks);
            break;

        case 'done':
            return filterDone(allTasks);
            break;

        case 'active':
            return filterActive(allTasks);
            break;

        default:
            return allTasks;
    }
}

let optionTasks = document.querySelector('.filter-option');

optionTasks.addEventListener('change', function () {
    let filtered = applyFilter(optionTasks.value);
    renderTasks(filtered);
});

function showTaskDetail() {
    // Task detail / click button detail
    let taskList = document.querySelector('.taskList'); //là div chứa các taskItem bên trong
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-detail')) {
            let task = e.target.closest('.taskItem');
            task.classList.toggle('active');
        }
    });
}


// btnDetail.forEach((btn) => {
//     btn.addEventListener('click', function (e) { //Sự kiện click toàn trang
//         // if (e.target.classList.contains('btn-detail')) { //nếu như phần tử click có chứa class là 'btn-detail'
//         // }
//         let task = this.closest('.taskItem'); //từ phần tử con e.target, đi lên trên tìm phần tử cha gần nhất chứa class .taskItem.
//         console.log(task);
//         task.classList.toggle('active'); //thêm, xóa class active vào taskItem
//         console.log(task.classList);
//     });
// })



//random border color tasks
function randomColor(allTask) {
    let tasksItem = document.querySelectorAll('.taskItem');
    // let colorTotal = '#0c4c4a';
    let colorDone = 'rgb(221, 74, 20)';
    let colorActive = 'rgb(152, 29, 152)';

    //
    for (let i = 0; i < allTask.length; i++) {
        if (allTask[i].status == 'active') {
            tasksItem[i].style.borderTop = `30px solid ${colorActive}`;
        }
        else if (allTask[i].status == 'done') {
            tasksItem[i].style.borderTop = `30px solid ${colorDone}`;
        }
    }


    /*
    tasksItem.forEach((t) => {
        let borderColor = `rgb(
            ${Math.random() * 255},
            ${Math.random() * 255},
            ${Math.random() * 255}
        )`;

        t.style.borderTop = `30px solid ${borderColor}`;
    });
    */
}

function checkTask() {
    document.addEventListener('click', async function (e) {
        if (e.target.classList.contains('btn-check')) {
            let id = e.target.closest('.taskItem').dataset.id;

            //lấy task theo id
            let response = await fetch(`http://localhost:3000/tasks/${id}`);
            if (response.ok) {
                let task = await response.json();

                //đổi status
                let newStatus = task.status === 'active' ? 'done' : 'active';

                //gửi lên server cập nhật giao diện
                await fetch(`http://localhost:3000/tasks/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                });
                renderTasks();
            }
        }
    });
}
