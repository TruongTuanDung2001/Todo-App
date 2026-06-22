//Get all task save
async function getTaskSave(){
    try {
        let response = await fetch('http://localhost:3000/tasks');
        let allTask = [];
        let allTaskSave = [];
        if(response.ok){
            allTask = await response.json();
            
            //Filter isFavorite true
            allTaskSave = allTask.filter(t => t.isFavorite == true);
            renderTaskSave(allTaskSave);
            searchTaskSave(allTaskSave);
        }
        
    } catch (error) {
        console.log(error);
    }
}

function renderTaskSave(taskSave){
    let saveList = document.querySelector('.save__list');
    saveList.innerHTML = '';
    taskSave.forEach((t) => {
        saveList.innerHTML += `
        <!-- Item -->
        <div class="save-task">
            <div class="save-task__top save-task__top--green"></div>
            <div class="save-task__content">
                <div class="save-task__title">
                    ${t.title}
                </div>

                <div class="save-task__desc">
                    ${t.description}
                </div>

                <div class="save-task__bottom">
                    <span>
                        ${t.startTime}
                    </span>

                    <button class="btn-open" data-page="dashboard">
                        Open
                    </button>
                </div>
            </div>
        </div>
        `
    })
}


function searchTaskSave(allTaskSave){
    let inputSearch = document.querySelector('.input-search');
    inputSearch.addEventListener('input', function(e){
        let keyword = this.value.toLowerCase().trim();
        let filtered = allTaskSave.filter(t => t.title.toLowerCase().includes(keyword) || t.description.toLowerCase().includes(keyword));

        renderTaskSave(filtered);
    });
}
