/* REQUEST Script Example for Testing in Postman */

// Test to check if the response is successful (status code 200)
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test to check if the response body is a JSON array
pm.test("Response is a JSON array", function () {
    pm.response.to.be.json;
    pm.response.to.be.ok;
    pm.expect(pm.response.json()).to.be.an("array");
});

// Test to check if each object in the response array has 
// name, email fields
pm.test("Users have required fields", function () {
    const users = pm.response.json();
    pm.expect(users).to.be.an("array").that.is.not.empty;

    users.forEach(function (user) {
        pm.expect(user).to.have.property("nameUser");
        pm.expect(user).to.have.property("emailUser");
    });
});

// Test to check if each object in the response array has 
// name, email, and mobile fields
/*pm.test("Users have required fields", function () {
    const users = pm.response.json();
    pm.expect(users).to.be.an("array").that.is.not.empty;

    users.forEach(function (user) {
        pm.expect(user).to.have.property("nameUser");
        pm.expect(user).to.have.property("emailUser");
        pm.expect(user).to.have.property("mobile");
    });
});*/


//----------------
/* PRE-REQUEST Script Example for Postman */
const preRequest = {
    method: 'POST',
    url: 'http://localhost:8000/users',
    header: {
        'Content-Type': 'application/json'
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({
        "nameUser": "Charlie",
        "emailUser": "charlie@example.com"
        })
    }
};

pm.sendRequest(preRequest, (err, response) => {
    if (err) {
        console.error('Error:', err);
        return;
    }

    console.log('Pre-request POST response:', response.json());
});