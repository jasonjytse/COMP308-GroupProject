import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    isLoggedIn {
      username
      role
      id
    }
  }
`;

function View() {
  const { data, loading, error } = useQuery(GET_USER_PROFILE);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (data && data.isLoggedIn) {
      setUserInfo(data.isLoggedIn);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user profile.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userInfo && (
        <div>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Role:</strong> {userInfo.role}</p>
          <p><strong>ID:</strong> {userInfo.id}</p>
          {/* Customize the component based on your schema and requirements */}
          {userInfo.role === 'nurse' && (
            <div>
              {/* Nurse-specific information can go here */}
              {/* You can display nurse-related data based on your schema */}
            </div>
          )}
          {userInfo.role === 'patient' && (
            <div>
              {/* Patient-specific information can go here */}
              {/* You can display patient-related data based on your schema */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default View;
