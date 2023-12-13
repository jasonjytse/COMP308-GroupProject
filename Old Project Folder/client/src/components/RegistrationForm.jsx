import React, { useState } from 'react';

function RegistrationForm({ userRole }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: userRole, // Set the role based on the prop
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation here (e.g., checking for empty fields, valid email format, etc.)

    // Send registration data to the GraphQL API for registration
    try {
      // const response = await fetch('', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      if (response.ok) {
        // Registration successful, display success message or redirect to login page
        console.log('Registration successful');
      } else {
        // Registration failed, display error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Conditionally render role specific input fields */}
        {userRole === 'nurse' && (
          <div>
            <label htmlFor="nurseField">Nurse-specific Field:</label>
            <input
              type="text"
              id="nurseField"
              name="nurseField"
              value={formData.nurseField}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
