import React from 'react';

const ProfileCard = ({ user }) => (
  <section className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold text-yellow-500 mb-4">User Information</h2>
    <div>
      <p>Name: {user.name}</p>
      <p>Player ID: {user.id}</p>
      <p>Balance: {user.balance}</p>
      <p>VIP Status: {user.vip}</p>
    </div>
  </section>
);

export default ProfileCard;
