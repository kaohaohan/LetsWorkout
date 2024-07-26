import React from "react";

//props
interface Team {
  name: string;
  imageUrl: string;
  memberCount?: number; //is optional
}
//解構寫法arrow裡面放object {}
const TeamCard: React.FC<Team> = ({ name, imageUrl, memberCount }) => {
  return (
    <div
      key={name}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={imageUrl} alt={name} />
      </div>
      <div className="min-w-0 flex-1">
        <a href="/coach/teams/members" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{name}</p>
          {memberCount && (
            <p className="truncate text-sm text-gray-500">
              {memberCount} members
            </p>
          )}
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
