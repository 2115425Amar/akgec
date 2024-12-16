import React, { useState } from 'react';


function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [employees, setEmployees] = useState([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (POST request)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', formData)
      .then(response => {
        console.log('Registration successful', response.data);
        alert("Form submitted successfully!");
        setFormData({ name: '', email: '', phone: '' });
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };

  // Fetch employees from the API (GET request)
  const fetchEmployees = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setEmployees(response.data);
        setShowEmployeeList(true);
      })
      .catch(error => {
        console.error('Error fetching employees!', error);
      });
  };

  return (
    <div className="App">
      <h1>Employee Registration Form</h1>
      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Button to fetch and show employees */}
      <button onClick={fetchEmployees}>Show Employees</button>

      {/* Employee List Grid */}
      {showEmployeeList && (
        <div className="employee-grid">
          {employees.map(employee => (
            <div className="employee-card" key={employee.id}>
              <h3>{employee.name}</h3>
              <p>Email: {employee.email}</p>
              <p>Phone: {employee.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
