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
async function getTasks() {
    try {
        let res = await fetch('http://localhost:3000/tasks');
        if (res.ok) {
            let tasks = await res.json();
            render(tasks);
        }
    } catch (error) {
        console.log(error);
    }
}
//Render tasks
function render(tasks) {
    //total-done-active
    let total = document.querySelector('.tasks-total');
    let done = document.querySelector('.tasks-done');
    let active = document.querySelector('.tasks-active');

    let tasksDone = tasks.filter(t => t.status == 'done');
    let tasksActive = tasks.filter(t => t.status == 'active');

    total.textContent = tasks.length;
    done.textContent = tasksDone.length;
    active.textContent = tasksActive.length;

    //list tasks
    let sidebarTasks = document.querySelector('.sidebar__tasks');
    sidebarTasks.innerHTML = '';
    tasks.forEach((t) => {
        sidebarTasks.innerHTML += `
                <ul class="sidebar__tasks">
                    <div class="sidebar__tasks-date">
                        ${t.startDate}
                    </div>
                    <li class="sidebar__item">
                        <div class="sidebar__item-time">
                            <p>${t.startTime}</p>
                            <span>${t.title}</span>
                        </div>

                        <div class="sidebar__item-content">
                            ${t.description}
                        </div>
                    </li>
                </ul>
        `;
    });


    console.log(tasks);
    console.log(tasks[0].status);
    console.log(tasksDone);


}
getTasks();


