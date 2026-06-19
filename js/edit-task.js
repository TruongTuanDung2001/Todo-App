async function loadEditTask(taskId) {
    try {
        let editTitle = document.querySelector('.inputTitle');
        let editDescription = document.querySelector('.inputDescription');
        let editStatus = document.querySelector('.inputStatus');
        let editPriority = document.querySelector('.inputPriority');
        let editDate = document.querySelector('.inputDate');
        let editFormGroup = document.querySelector('.inputFormGroup');
        let editDeadline = document.querySelector('.inputDeadline');
        //
        let response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        if (response.ok) {
            let task = await response.json();
            console.log(task);
            // gán giá trị các input bằng dữ liệu của task qua id
            editTitle.value = task.title;
            editDescription.value = task.description;
            editStatus.value = task.status;
            editPriority.value = task.priority;
            editDate.value = task.startDate;
            editFormGroup.value = task.startTime;
            editDeadline.value = task.deadline;
            updateTask(taskId, {
                editTitle,
                editDescription,
                editStatus,
                editPriority,
                editDate,
                editFormGroup,
                editDeadline
            }); // truyền vào id của cái task, dữ liệu input mới sau khi thay đổi, vì button có btn.addEvent nên khi bấm vào button mới chạy updateTask() thì lúc đó sẽ lấy giá trị hiện tại của input.
        }
    } catch (error) {
        console.log(error);
    }
}

// 
async function updateTask(taskId, input) {
    try {
        let btnUpdate = document.querySelector('.btnUpdate');
        btnUpdate.addEventListener('click', async function (e) {
            e.preventDefault();
            let taskChange = { //tạo 1 task mới thay đổi
                'title': input.editTitle.value,
                'description': input.editDescription.value,
                'status': input.editStatus.value,
                'priority': input.editPriority.value,
                'startDate': input.editDate.value,
                'startTime': input.editFormGroup.value,
                'deadline': input.editDeadline.value,
            }

            //
            let response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskChange),
            });

            //
            if (response.ok) {
                alert(
                    'Update success'
                );

                renderPage(
                    'dashboard'
                );
            }

        });
    } catch (error) {
        console.log(error);

    }
}
