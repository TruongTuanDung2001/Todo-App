//Get all task save
async function getTaskSave(){
    try {
        let response = await fetch('http://localhost:3000/tasks');
        let allTask = [];
        let allTaskSave = [];
        if(response.ok){
            allTask = await response.json();
            console.log(allTask);
        }

        //Filter isFavorite true
        allTaskSave = allTask.filter(t => t.isFavorite == true);
        console.log(allTaskSave);
        
    } catch (error) {
        console.log(error);
    }
}

