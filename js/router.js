//Chuyển nội dung main thành trang save, mà không load dữ liệu

let layoutMain = document.querySelector('.layout__main');

async function renderPage(page){
    let response = await fetch(`../html/pages/${page}.html`);

    if(response.ok){
        let html = await response.text();
        console.log(html);
    
        layoutMain.innerHTML = html;
    }
    if(page === 'dashboard'){
        getTasks();
        showTaskDetail();
    }
    
}

document.addEventListener('click', function(e){
    let page = e.target.dataset.page;
    if(page){
        renderPage(page);
    }
})

renderPage('dashboard');