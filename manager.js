
$(document).ready(function() {
    $("#login-btn").click(function() {
        console.log("Login button clicked");
        window.location.href = "dashboard.html";
    });

});





function Manager() {
    return {
        employeeList: [],
        createEmployee: createEmployee,
        hireEmployee: hireEmployee,
        fireEmployee: fireEmployee,
        searchByCrit: searchByCrit,
        display: display,
        rateEmployee: rateEmployee,
        numberOfEmployees: 0
    };
}

const displayEmployeeCount = function() {
    $("#employeeCount").text("Total Employees: " + manager1.numberOfEmployees)
}

const createEmployee = function(firstName, lastName, age, department, email) {
    return {
        firstName: firstName,
        lastName: lastName,
        age: age,
        department: department,
        email: email,
        rating: 0,
        id: idGenerator()
    };
};

const hireEmployee = function(employee) {
    this.employeeList.push(employee);
    this.numberOfEmployees++;
    const message = employee.firstName + " " + employee.lastName + " id n° : " + employee.id+ " " + " has been hired in the " + employee.department + " department";
    display(message);
    displayOnboard(message);
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
            const message = employee.firstName + " " + employee.lastName + " id n° : " + employee.id+ " " +" has been fired from the " + employee.department + " department";
            display(message)
            displayOnboard(message, "red");
            displayEmployeeCount()
            break;
        }
    }
};







const rateEmployee = function (value , id ){

for (var i = 0 ; i < this.employeeList.length ; i ++ ){

    if (this.employeeList[i].id === id ){

        this.employeeList[i].rating === value
    }
}

}


const generateId = function () {
    var count = 1;
    return function () {
      var t = count
      count = count + 1;
      return t
    };
  }

const idGenerator = generateId()



  const searchByCrit = function (crit){
    if (crit === 'name') {
          return searchByName
      } else if (crit === 'department') {
          return searchByDepartment
      } else if (crit === 'ageRange') {
          return searchByAgeRange
      } else if (crit === 'id') {
          return searchById
      } else if (crit === 'rating') {
          return searchByRating
      } else {
          return display('no employees found')
      }
  }
    
            
            
       
  
  const searchByName = function (name) {
    return this.employeeList.filter(employee => 
        employee.firstName.toLowerCase().includes(name.toLowerCase())
        
    )
}

const searchByDepartment = function (department) {
    return this.employeeList.filter(employee => 
      employee.department.toLowerCase() === department.toLowerCase()
    )
}

const searchByAgeRange = function (age) {
    return this.employeeList.filter(employee => 
  age - 5 < employee.age < age + 5
    )
}

const searchById = function (id) {
    return this.employeeList.filter(employee => employee.id === id);
}

const searchByRating = function (Rating) {
    return this.employeeList.filter(employee => 
        employee.rating === Rating
    )
}



const display = function (message) {
  console.log(message)
}










   
    var manager1 = Manager();
    

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
    }
    else
   
    var employee = manager1.createEmployee(firstName, lastName, age, department, email)

    
    manager1.hireEmployee(employee)

    console.log("Employee List:", manager1.employeeList)
});





    $('#fireButton').on('click', function() {
        var employeeId = $('#employeeId').val()
        manager1.fireEmployee(employeeId)
        console.log("Employee List after firing:", manager1.employeeList)
    })
    


    const displayOnboard = function(message, color) {
        $(".whiteboard").append("<p style='color: " + color + ";'>" + message + "</p>");
    };



     $('#clearWhiteboard').on('click', function() {
         $('.whiteboard').empty()
    })
        
    




    function displayEmployees() {
        
        $("#databaseSection").empty();
        manager1.employeeList.forEach(function(employee) {
            
            var employeeDiv = $("<div></div>").addClass("employee");

            employeeDiv.css({
                "border": "1px solid black",
                "margin-bottom": "10px",
                "padding": "10px"
            });
    
            employeeDiv.append("<p><strong>First Name:</strong> " + employee.firstName + "</p>");
            employeeDiv.append("<p><strong>Last Name:</strong> " + employee.lastName + "</p>");
            employeeDiv.append("<p><strong>Age:</strong> " + employee.age + "</p>");
            employeeDiv.append("<p><strong>Department:</strong> " + employee.department + "</p>");
            employeeDiv.append("<p><strong>Email:</strong> " + employee.email + "</p>");
            employeeDiv.append("<p><strong>Rating:</strong> " + employee.rating + "</p>");
            employeeDiv.append("<p><strong>ID:</strong> " + employee.id + "</p>");
    
            $("#databaseSection").append(employeeDiv);
        });
    
        var resetButton = $("<button>back</button>").addClass("reset-button");
        
    
        resetButton.click(function() {
            resetDatabaseSection();
        });
    
        $("#databaseSection").append(resetButton);
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
    
    function showDatabase() {
        displayEmployees();
    }
    
    $("#viewDatabaseButton").click(function() {
        showDatabase();
    });
    