document.getElementById('signUpButton').addEventListener('click', function() {
    const useremail = document.getElementById('useremail').value;
    const userpassword = document.getElementById('userpassword').value;
    const username = document.getElementById('username').value;

    console.log("User Details: ", useremail, username); 

    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost/server/register.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log("Server Response: ", request.responseText); 
            const res = JSON.parse(request.responseText);
            if (res.status === 'success') {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        }
    };
    
    const payload = JSON.stringify({ useremail: useremail, username: username, userpassword: userpassword });
    request.send(payload);
});
