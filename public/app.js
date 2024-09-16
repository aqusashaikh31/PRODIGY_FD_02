document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');
    const employeeList = document.getElementById('employeeList');

    // Fetch employees and display
    function fetchEmployees() {
        fetch('/api/employees')
            .then(response => response.json())
            .then(data => {
                employeeList.innerHTML = '';
                data.forEach(employee => {
                    const li = document.createElement('li');
                    li.textContent = `${employee.name} - ${employee.position} - $${employee.salary}`;
                    employeeList.appendChild(li);
                });
            });
    }

    // Add new employee
    form.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const salary = document.getElementById('salary').value;

        fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, position, salary })
        })
            .then(response => response.json())
            .then(() => {
                form.reset();
                fetchEmployees();
            });
    });

    fetchEmployees();
});
