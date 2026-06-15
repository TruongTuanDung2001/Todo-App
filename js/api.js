//Delete api task
async function deleteTask(taskId){
    try{
        let response = await fetch(`http://localhost:3000/tasks/${taskId}`,{
            method: 'DELETE'
        });
        if(response.ok){
            alert("Delete task success");
            let data = response.json();
            console.log(data);
        }
    }catch(error){
        console.log(error);
    }
}

