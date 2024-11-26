import React from 'react';
import Card from '../components/ui/Card';

const ProfileSection = ({ title, children }) => (
  <Card className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </Card>
);

const StatItem = ({ label, value, isCurrency = false }) => (
  <div className="flex justify-between">
    <span className="font-semibold">{label}:</span>
    <span>
      {isCurrency && (
        <img src="/img/moneda.png" alt="Coin" className="w-5 h-5 inline-block mr-1" />
      )}
      <span className={isCurrency ? 'text-yellow-400' : ''}>{value}</span>
    </span>
  </div>
);

const Profile = () => {
  return (
    <div className="space-y-8">
      <ProfileSection title="User Information">
        <StatItem label="Name" value="Juan Pérez" />
        <StatItem label="Player ID" value="#123456789" />
        <StatItem label="Available Balance" value="1000" isCurrency />
        <StatItem label="VIP Status" value="Platinum" />
      </ProfileSection>

      <ProfileSection title="Game Statistics">
        <StatItem label="Games Played" value="256" />
        <StatItem label="Total Winnings" value="12,500" isCurrency />
        <StatItem label="Games Won" value="120" />
        <StatItem label="Games Lost" value="136" />
        <StatItem label="Average Bet" value="50" isCurrency />
      </ProfileSection>

      <ProfileSection title="Prize History">
        <StatItem label="Last Prize" value="500" isCurrency />
        <StatItem label="Best Prize" value="1,200" isCurrency />
      </ProfileSection>
    </div>
  );
};

export default Profile;