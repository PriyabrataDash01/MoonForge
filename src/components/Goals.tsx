import React from 'react';
import { Card } from './Card';
import { 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Gift,
  ArrowRight
} from 'lucide-react';

interface Goal {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const goals: Goal[] = [
  {
    icon: <Target className="text-indigo-400" size={24} />,
    title: "Revolutionize Twitter Marketing",
    description: "Transform social media promotion through blockchain technology, making it accessible and efficient for everyone."
  },
  {
    icon: <Users className="text-purple-400" size={24} />,
    title: "Empower Community Growth",
    description: "Build a thriving ecosystem where users can easily promote projects while earning rewards through our native token."
  },
  {
    icon: <Lightbulb className="text-blue-400" size={24} />,
    title: "Drive Innovation in SocialFi",
    description: "Pioneer new standards in decentralized social media marketing, combining DeFi principles with social networking."
  },
  {
    icon: <TrendingUp className="text-green-400" size={24} />,
    title: "Ensure Sustainable Value",
    description: "Implement a strategic token launch post-campaign completion, focusing on long-term ecosystem stability and growth."
  },
  {
    icon: <Gift className="text-pink-400" size={24} />,
    title: "Reward Early Supporters",
    description: "Distribute exclusive airdrops to early adopters who actively participate in promotional missions, fostering a strong initial community."
  }
];

export const Goals: React.FC = () => {
  return (
    <Card className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Our Vision & Goals
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join us in reshaping the future of social media promotion - where marketing meets blockchain innovation.
        </p>
      </div>

      <div className="grid gap-6">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="group relative flex items-start gap-6 p-6 bg-gray-800/30 rounded-xl transition-all duration-300
              hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-800/20 card-3d"
          >
            <div className="flex-shrink-0">
              <div className="p-3 rounded-xl bg-gray-700/30">
                {goal.icon}
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent 
                group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400
                transition-all duration-300">
                {goal.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {goal.description}
              </p>
            </div>

            <ArrowRight 
              className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                transform group-hover:translate-x-2 transition-all duration-300 text-indigo-400" 
              size={20} 
            />
          </div>
        ))}
      </div>
    </Card>
  );
};