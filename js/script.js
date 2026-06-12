//


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
