 //WORK BY AI kh phải tuiiii :))))
async function downloadCSV() {
    try {

        let response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
            return;
        }
        let tasks = await response.json();
        let today = new Date().toISOString().split('T')[0];
        let todayTasks =tasks.filter(
                t => t.startDate === today
            );
        if (todayTasks.length === 0) {
            alert('No task today');
            return;
        }

        // Header (1 dòng)
        let csv ='id,title,description,status,priority,createdAt,startDate,startTime,deadline\n';
        // Data
        todayTasks.forEach(
            t => {
                csv += [
                    t.id,
                    t.title,
                    t.description,
                    t.status,
                    t.priority,
                    t.createdAt,
                    t.startDate,
                    t.startTime,
                    t.deadline
                ]
                    .map(
                        v =>
                            `"${v ?? ''}"`
                    ).join(',') + '\n';
            }
        );

        // tạo file
        let blob =
            new Blob(
                [
                    '\uFEFF' + csv
                ],
                {
                    type:
                        'text/csv;charset=utf-8'
                }
            );
        let url =
            URL.createObjectURL(
                blob
            );
        let a = document.createElement('a');
        a.href = url;
        a.download = `tasks-${today}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
    catch (error) {
        console.log(error);
    }
}

//gắn nút download
function initDownload() {
    let btn = document.querySelector('.btnDownloadCSV');
    if (!btn) {
        return;
    }
    btn.addEventListener('click', function (e) {
        downloadCSV();
    });

}
