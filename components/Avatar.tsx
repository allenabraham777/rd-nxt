import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  seed?: string;
  sprites?: string;
  large?: boolean;
};

const Avatar = ({ seed, large, sprites }: Props) => {
  const { data: session } = useSession();
  return (
    <div
      className={`relative h-10 w-10 rounded-full border-gray-300 bg-white overflow-hidden ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/${sprites || "open-peeps"}/${
          seed || session?.user?.name || "placeholder"
        }.svg`}
      />
    </div>
  );
};

export default Avatar;
