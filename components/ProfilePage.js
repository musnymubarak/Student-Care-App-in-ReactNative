import React, { useEffect, useState } from 'react';
import { students } from '../assets/StudentsDb'; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    
    if (loggedInUser) {
      
      const studentDetails = students.find((student) => student.username === loggedInUser);
      if (studentDetails) {
        setUser(studentDetails);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{user.name}</h2>
        <img src={user.profile_pic} alt={user.name} className="profile-pic" />
      </div>
      <div className="profile-details">
        <h3>Contact Information</h3>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <h3>Biological Information</h3>
        <p>Gender: {user.gender}</p>
        <p>Blood Group: {user.blood_group}</p>
        <h3>Address</h3>
        <p>{user.address}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
