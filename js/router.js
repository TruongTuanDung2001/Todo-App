//Chuyển nội dung main thành trang save, mà không load dữ liệu

let layoutMain = document.querySelector('.layout__main');
initRouter();


async function renderPage(page){
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
}

function initRouter(){
    document.addEventListener('click', function(e){
        let page = e.target.dataset.page;
        if(page){
            renderPage(page);
        }
    })

}
renderPage('create-task');