//Post task api
async function createTask(){
    try {
        let response = await fetch('http://localhost:3000/tasks',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        })
        if(response.ok){
            alert('Add success');
        }
    } catch (error) {
        console.log(error);
    }
}

function clickBtn(){
    console.log('kaksk');
    
    let btnCreate = document.querySelector('.btnCreate');
    let taskCreate = [];
    //
    let taskTitle = document.querySelector('.inputTitle');
    let taskDescription = document.querySelector('.inputDescription');
    let taskStatus = document.querySelector('.inputStatus');
    let taskPriority = document.querySelector('.inputPriority');
    let taskDate = document.querySelector('.inputDate');
    let taskFormGroup = document.querySelector('.inputFormGroup');
    let taskDeadline = document.querySelector('.inputDeadline');

    //
    if(!btnCreate){
        return
    }
    btnCreate.addEventListener('click', function(e) {
        console.log('clicked');
        e.preventDefault();
        if(
            taskTitle.value.trim() &&
            taskDescription.value.trim() &&
            taskStatus.value &&
            taskPriority.value &&
            taskDate.value &&
            taskFormGroup.value &&
            taskDeadline.value
        )
        {
            let task = {
                title: taskTitle.value,
                description: taskDescription.value,
                status: taskStatus.value,
                priority: taskPriority.value,
                startDate: taskDate.value,
                startTime: taskFormGroup.value,
                deadline: taskDeadline.value,
                createAt: new Date().toISOString().split('T')[0],
            };
            taskCreate.push(task);
            console.log(taskCreate);
        }
        else{
            console.log('Thiếu dữ liệu.');
        }
    });
}