import {
  getTotalContactsCount,
  getTotalContactsCountToDay,
} from "@/app/data/contacts-data";
import { getTotalUsersCount, getUserCountToday } from "@/app/data/users-data";
import StatusCard from "@/components/StatusCard";
import { Contact, User2Icon, UserIcon } from "lucide-react";

const DashBoardStats = async () => {
  const usersCount = await getTotalUsersCount();
  const userCountToday = await getUserCountToday();
  const contactsCount = await getTotalContactsCount();
  const contactsCountToday = await getTotalContactsCountToDay();
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

      <StatusCard
        text="Total  Contacts"
        value={contactsCount.toString()}
        icon={<Contact className="h-4 w-4" />}
      />

      <StatusCard
        text="Total New Contacts"
        value={contactsCountToday.toString()}
        icon={<Contact className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashBoardStats;
