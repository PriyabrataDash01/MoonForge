import React from 'react';
import { MissionCard } from './MissionCard';
import { useMissionStore } from '../../stores/missionStore';

export const MissionsList: React.FC = () => {
  const { missions, startMission, completeMission } = useMissionStore();

  return (
    <div className="grid grid-cols-1 gap-4">
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          onStart={() => startMission(mission.id)}
          onComplete={() => completeMission(mission.id)}
        />
      ))}
    </div>
  );
};