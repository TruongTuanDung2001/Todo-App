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