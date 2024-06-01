const retrieveData = () => {
    let tbodyElem = document.getElementById('tbody');
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost/server/search.php');
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log("Data retrieved: ", request.responseText); // Debugging statement
            const res = JSON.parse(request.responseText);
            tbodyElem.innerHTML = '';
            res.forEach(item => {
                tbodyElem.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.decs}</td>
                        <td>
                            <button class='btn btn-danger' id="delete" 
                            onclick="deleteItem(${item.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        }
    };
    request.send();
};

retrieveData();

let searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', () => {
    let tbodyElem = document.getElementById('tbody');
    let searchValue = document.getElementById('search').value;
    console.log("Search term: ", searchValue); // Debugging statement

    setTimeout(() => {
        const request = new XMLHttpRequest();
        request.open('GET', `http://localhost/server/search.php?name=${searchValue}`);

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                const res = JSON.parse(request.responseText);
                tbodyElem.innerHTML = ''; // Clear previous results
                res.forEach(item => {
                    tbodyElem.innerHTML += `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.decs}</td>
                            <td>
                                <button class='btn btn-danger' id="delete" 
                                    onclick="deleteItem(${item.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
            }
        };
        request.send();
    }, 4000);
});

function deleteItem(id) {
    console.log("Deleting item with ID: ", id); 
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost/server/delete.php?id=${id}`);
    
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            const res = JSON.parse(request.responseText);
            if (res.status == 'success') {
                alert('Project Deleted');
                retrieveData();
            } else {
                alert('Something went wrong');
            }
        }
    };
    request.send();
}
