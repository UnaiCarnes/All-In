import React from 'react';
import Card from '../components/ui/Card';

const ProfileSection = ({ title, children }) => (
  <Card className="mb-8 bg-black p-6 rounded-lg">
    <h2 className="text-xl font-bold text-yellow-400 mb-4">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </Card>
);

const StatItem = ({ label, value, isCurrency = false }) => (
  <div className="flex justify-between text-white">
    <span className="font-semibold">{label}:</span>
    <span className="flex items-center">
      {isCurrency && (
        <img src="/img/moneda.png" alt="Coin" className="w-5 h-5 inline-block mr-1" />
      )}
      <span className={isCurrency ? 'text-yellow-400 font-bold' : 'text-white'}>{value}</span>
    </span>
  </div>
);

const Profile = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#2d3748] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileSection title="User Information">
          <StatItem label="Name" value="Juan Pérez" />
          <StatItem label="Player ID" value="#123456789" />
          <StatItem label="Available Balance" value="1000" isCurrency />
          <StatItem label="Email" value="juanperez@example.com" />
        </ProfileSection>

        <ProfileSection title="Game Statistics">
          <StatItem label="Games Played" value="256" />
          <StatItem label="Most Played Game" value="Roulette" />
          <StatItem label="Games Won" value="120" />
          <StatItem label="Games Lost" value="136" />
          <StatItem label="Win Rate" value="47%" />
          <StatItem label="Average Bet" value="50" isCurrency />
          <StatItem label="Total Winnings" value="12,500" isCurrency />
          <StatItem label="Total Losses" value="14,750" isCurrency />
          <StatItem label="Total w/l" value="-2,250" isCurrency />
        </ProfileSection>

        <ProfileSection title="Prize History">
          <StatItem label="Last Prize" value="500" isCurrency />
          <StatItem label="Best Prize" value="1,200" isCurrency />
          <StatItem label="Highest Bet" value="750" isCurrency />
          <StatItem label="Highest Streak" value="6" />
        </ProfileSection>

        <ProfileSection title="Consumables">
          <StatItem label="Alcoholic Drink" value="5" />
          <StatItem label="Hydrating Drink" value="2" />
          <StatItem label="Toxic Substances" value="7" />
        </ProfileSection>
      </div>
    </div>
  );
};

export default Profile;