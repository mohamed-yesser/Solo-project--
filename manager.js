$(document).ready(function() {
    $("#login-btn").click(function() {
        window.location.href = "dashboard.html";
    });
});

function Manager() {
    return {
        employeeList: [],
        createEmployee: createEmployee,
        hireEmployee: hireEmployee,
        fireEmployee: fireEmployee,
        display: display,
        rateEmployee: rateEmployee,
        numberOfEmployees: 0
    };
}



const createEmployee = function(firstName, lastName, age, department, email) {
    return {
        firstName: firstName,
        lastName: lastName,
        age: age,
        department: department,
        email: email,
        rating: 1,
        id: idGenerator()
    };
};

const hireEmployee = function(employee) {
    this.employeeList.push(employee)
    this.numberOfEmployees++
    const message = employee.firstName + " " + employee.lastName + " , id n° : " + employee.id + " has been hired in the " + employee.department + " department";
    display(message)
    displayOnboard(message)
    displayEmployeeCount()
};

const fireEmployee = function(id) {
    id = parseInt(id);
    for (var i = 0; i < this.employeeList.length; i++) {
        var employeeId = parseInt(this.employeeList[i].id)
        if (employeeId === id) {
            const employee = this.employeeList[i]
            this.employeeList.splice(i, 1)
            this.numberOfEmployees--
            const message = employee.firstName + " " + employee.lastName + " , id n° : " + employee.id + " has been fired from the " + employee.department + " department";
            display(message)
            displayOnboard(message, "red")
            displayEmployeeCount()
            break;
        }
    }
};

const rateEmployee = function(value, id) {
    for (var i = 0; i < this.employeeList.length; i++) {
        if (this.employeeList[i].id === id) {
            this.employeeList[i].rating === value
        }
    }
}

const generateId = function() {
    var count = 1;
    return function() {
        var t = count
        count = count + 1;
        return t
    };
}

const idGenerator = generateId()

const display = function(message) {
    console.log(message)
}





var manager1 = Manager();


const displayEmployeeCount = function() {
    $("#employeeCount").text("Total Employees: " + manager1.numberOfEmployees)
}



$('#hireButton').on('click', function() {
    var firstName = $('#firstName').val()
    var lastName = $('#lastName').val()
    var age = $('#age').val()
    var department = $('#department').val()
    var email = $('#email').val()

    if (!firstName || !lastName || !age || !department || !email) {
        if (!firstName) displayOnboard('Please enter a first name for your employee', "black")
        if (!lastName) displayOnboard('Please enter a last name for your employee', "black")
        if (!age) displayOnboard('Please enter an age for your employee', "black")
        if (!department) displayOnboard('Please enter a department for your employee', "black")
        if (!email) displayOnboard('Please enter an email for your employee', "black")
        return
    } else

        var employee = manager1.createEmployee(firstName, lastName, age, department, email)

    manager1.hireEmployee(employee)
});

$('#fireButton').on('click', function() {
    var employeeId = $('#employeeId').val()
    manager1.fireEmployee(employeeId)
})



const displayOnboard = function(message, color) {
    $(".whiteboard").append("<p style='color: " + color + ";'>" + message + "</p>");
}



$('#clearWhiteboard').on('click', function() {
    $('.whiteboard').empty()
})

function showDatabase() {
    $("#databaseSection").empty();
    var searchDiv = $("<div></div>").addClass("search-container");

    
    var inputStyle = "width: 100px; margin-right: 10px;";
    searchDiv.append("<input type='text' id='firstNameInput' placeholder='First Name' style='" + inputStyle + "'>")
    searchDiv.append("<input type='text' id='lastNameInput' placeholder='Last Name' style='" + inputStyle + "'>")
    searchDiv.append("<input type='text' id='departmentInput' placeholder='Department' style='" + inputStyle + "'>")
    searchDiv.append("<input type='number' id='ageInput' placeholder='Age' style='" + inputStyle + "'>")
    searchDiv.append("<input type='number' id='ratingInput' placeholder='Rating' style='" + inputStyle + "'>")
    searchDiv.append("<input type='number' id='idInput' placeholder='ID' style='" + inputStyle + "'>")

    var searchButton = $("<button id='searchButton0'>Search</button>").addClass("search-button")
    searchDiv.append(searchButton);

    var resetButton = $("<button>Back</button>").addClass("reset-button")
    resetButton.click(function() {
        resetDatabaseSection();
    });

    $("#databaseSection").append(searchDiv)
    $("#databaseSection").append(resetButton)

    manager1.employeeList.forEach(function(employee) {
        var employeeDiv = $("<div></div>").addClass("employee");
        employeeDiv.css({
            "border": "1px solid black",
            "margin-bottom": "10px",
            "padding": "10px"
        });
        employeeDiv.append("<p><strong>First Name:</strong> " + employee.firstName + "</p>")
        employeeDiv.append("<p><strong>Last Name:</strong> " + employee.lastName + "</p>")
        employeeDiv.append("<p><strong>Age:</strong> " + employee.age + "</p>")
        employeeDiv.append("<p><strong>Department:</strong> " + employee.department + "</p>")
        employeeDiv.append("<p><strong>Email:</strong> " + employee.email + "</p>")
        employeeDiv.append("<p><strong>Rating:</strong> " + employee.rating + "</p>")
        employeeDiv.append("<p><strong>ID:</strong> " + employee.id + "</p>")
        $("#databaseSection").append(employeeDiv)
    });

    $("#searchButton0").on("click", function() {
        var firstName0 = $("#firstNameInput").val()
        var lastName0 = $("#lastNameInput").val()
        var department0 = $("#departmentInput").val()
        var age0 = parseInt($("#ageInput").val())
        var rating0 = parseInt($("#ratingInput").val())
        var id0 = parseInt($("#idInput").val())

        var filteredEmployees = manager1.employeeList.filter(function(employee) {
            var passFilter = true

            if (firstName0 && employee.firstName !== firstName0) {
                passFilter = false
            }
            if (lastName0 && employee.lastName !== lastName0) {
                passFilter = false
            }
            if (department0 && employee.department !== department0) {
                passFilter = false
            }
            if (!isNaN(age0) && employee.age !== age0) {
                passFilter = false
            }
            if (!isNaN(rating0) && employee.rating !== rating0) {
                passFilter = false
            }
            if (!isNaN(id0) && employee.id !== id0) {
                passFilter = false
            }
            return passFilter;
        });

        $("#databaseSection .employee").remove()

        filteredEmployees.forEach(function(employee) {
            var employeeDiv = $("<div></div>").addClass("employee");
            employeeDiv.css({
                "border": "1px solid black",
                "margin-bottom": "10px",
                "padding": "10px"
            });
            employeeDiv.append("<p><strong>First Name:</strong> " + employee.firstName + "</p>")
            employeeDiv.append("<p><strong>Last Name:</strong> " + employee.lastName + "</p>")
            employeeDiv.append("<p><strong>Age:</strong> " + employee.age + "</p>")
            employeeDiv.append("<p><strong>Department:</strong> " + employee.department + "</p>")
            employeeDiv.append("<p><strong>Email:</strong> " + employee.email + "</p>")
            employeeDiv.append("<p><strong>Rating:</strong> " + employee.rating + "</p>")
            employeeDiv.append("<p><strong>ID:</strong> " + employee.id + "</p>")
            $("#databaseSection").append(employeeDiv);
        });
    });
}

    




function resetDatabaseSection() {
    $("#databaseSection").empty();
    $("#databaseSection").append('<h2 id="databaseH2">Database</h2>');
    $("#databaseSection").append('<p id="employeeCount">Total Employees: ' + manager1.employeeList.length + '</p>');
    $("#databaseSection").append('<button id="viewDatabaseButton">View Database</button>');

    $("#viewDatabaseButton").click(function() {
        showDatabase();
    });


}



$("#viewDatabaseButton").click(function() {
    showDatabase();
});

