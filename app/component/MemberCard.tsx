import React from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  FireIcon,
} from "@heroicons/react/20/solid";
//props

interface Member {
  name: string;
  title: string;
  imageUrl: string;
  status: string;
}
//解構寫法arrow裡面放object {}
const MemberCard: React.FC<Member> = ({ name, imageUrl, title, status }) => {
  console.log();
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {name}
            </h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {status}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{title}</p>
        </div>
        <img
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
          src={imageUrl}
          alt=""
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          {/* <div className="flex w-0 flex-1">
            <a
              href="#"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <ChatBubbleBottomCenterTextIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Message
            </a>
          </div> */}
          <div className="-ml-px flex w-0 flex-1">
            <a
              href="/coach/members/123"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <FireIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Workout
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MemberCard;
