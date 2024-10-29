import StatusCard from "@/components/StatusCard";
import { TextIcon, User2Icon, UserIcon } from "lucide-react";

const dashBoardStats: { text: string; value: string; icon: React.ReactNode }[] =
  [
    {
      text: "Total Reviews",
      value: "120",
      icon: <TextIcon className="h-4 w-4" />,
    },
    {
      text: "Total New Reviews",
      value: "10",
      icon: <TextIcon className="h-4 w-4" />,
    },
  ];

const DashBoardStats = async () => {
  const usersCount = 40;
  const userCountToday = 5;
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <StatusCard
        text="Total Users"
        value={usersCount.toString()}
        icon={<User2Icon className="h-4 w-4" />}
      />
      <StatusCard
        text="Total New Users"
        value={userCountToday.toString()}
        icon={<UserIcon className="h-4 w-4" />}
      />

      {dashBoardStats.map((stat, idx) => (
        <StatusCard
          key={`card_stat_${idx}`}
          text={stat.text}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default DashBoardStats;
