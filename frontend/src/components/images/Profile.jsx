import React from 'react';
import './profile.css';

const Profile = ({src, alt}) => {
    return  <img className="profile-pic" src={src} alt={alt} />;
}

export default Profile;