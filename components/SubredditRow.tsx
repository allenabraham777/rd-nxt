import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  index: number;
  topic: string;
};

const SubredditRow = ({ index, topic }: Props) => {
  return <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 las:rounded-b">
    <p>{index + 1}</p>
    <ChevronUpIcon className="h-4 w-4 shrink-0 text-green-400"/>
    <Avatar sprites="avataaars" seed={`/r/${topic}`}/>
    <p className="flex-1 truncate">r/{topic}</p>
    <Link href={`/r/${topic}`}><span className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">View</span></Link>
  </div>;
};

export default SubredditRow;
