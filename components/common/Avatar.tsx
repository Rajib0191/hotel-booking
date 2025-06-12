import Image from "next/image";
import { ChevronDown } from "lucide-react";

const Avatar = ({ src, name }: { src?: string; name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex justify-center items-center gap-1 cursor-pointer">
      <div className="relative h-9 w-9 rounded-full bg-blue flex items-center justify-center">
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <span className="text-background font-medium text-sm">
            {initials}
          </span>
        )}
      </div>
      <div className="flex justify-center items-center font-medium text-[16px]">
        <div className="underline">{name}</div>
        <div>
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
