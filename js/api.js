//Delete api task
async function deleteTask(taskId){
    try{
        let response = await fetch(`http://localhost:3000/tasks/${taskId}`,{
            method: 'DELETE'
        });
        if(response.ok){
            alert("Delete success");
            let data = await response.json();
            console.log(data);
        }
    }catch(error){
        console.log(error);
    }
}

document.addEventListener('click', async function(e){
    if(e.target.classList.contains('btn-delete')){
        let task = e.target.closest('.taskItem');
        let taskId = task.dataset.id;

        let isConfirm = confirm('Are you sure you want to delete this task!');
        
        if(isConfirm){
            await deleteTask(taskId);
            getTasks();
        }
    }
});

//Toggle isFavorite task
async function toggleFavorite(taskId, favoriteStatus){
    try {
        let response = await fetch(`http://localhost:3000/tasks/${taskId}`,{
            method: 'PATCH', //thay đổi vài field
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                isFavorite: !favoriteStatus //vào task có taskId thay đổi isFavorite, nếu kh có hoặc khác tên field thì kh thay đồi gì.
            })
        });
        if(response.ok){
            let data = await response.json();
            console.log(data);
        }else{
            getTasks();
        }

    } catch (error) {
        console.log(error);
        
    }
}

document.addEventListener('click', async function(e){
    if(e.target.classList.contains('btn-favorite')){
        let task = e.target.closest('.taskItem');
        let taskId = task.dataset.id;

        let isFavorite = allTasks.find((t) => t.id === taskId).isFavorite;

        await toggleFavorite(taskId, isFavorite);
    } 
});