//Chuyển nội dung main thành trang save, mà không load dữ liệu

let layoutMain = document.querySelector('.layout__main');
initRouter();


async function renderPage(page, taskId = null){
    let response = await fetch(`../html/pages/${page}.html`);

    if(response.ok){
        let html = await response.text();
        layoutMain.innerHTML = html;
    }
    if(page === 'dashboard'){
        console.log('dashboard.html');
        getTasks();
        showTaskDetail();
    }
    else if(page === 'save'){
        console.log('save.html');
        await getTaskSave();
    }
    else if(page === 'create-task'){
        console.log('create-task.html');
        clickBtn();
    }
    else if(page === 'edit-task'){
        console.log('edit-task.html');
        loadEditTask(taskId);
        deleteTaskEditPage(taskId);
    }
    else if(page === 'download'){
        console.log('download.html');
        initDownload();
    }
}

function initRouter(){
    document.addEventListener('click', function(e){
        let page = e.target.dataset.page;
        let taskId = e.target.dataset.id;
        if(!page){
            return
        }
        else if(taskId){
            renderPage(page, taskId);
        }
        else{
            renderPage(page);
        }
    })
}
renderPage('dashboard');