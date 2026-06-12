//
let today = document.querySelectorAll('.today');
function formatDate(){
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
function updateDate(){
    today.forEach((e) =>{
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
sidebarLogout.addEventListener('click', function(e){
    e.preventDefault();

    localStorage.removeItem('currentUser');
    
    window.location.href = 'login.html';
});

