import { LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push(`/login`);
  };

  return (
    <div className=" absolute top-8 bg-background py-4 right-0 w-60 h-48 border border-border rounded-lg shadow-md  flex flex-col gap-3">
      <div className="px-4 pb-2 border-b border-border">
        <h5 className="text-sm font-semibold text-secondary">
          {" "}
          {data && data.user ? data.user.name : "User"}
        </h5>{" "}
        <h5 className="text-sm font-light text-muted">
          {" "}
          {data && data.user ? data.user.email : ""}
        </h5>{" "}
      </div>
      <div className="px-4 pb-2 border-b border-border flex flex-col gap-2">
        <div className="flex gap-2 justify-start items-center ">
          <User className="w-4 h-4 text-secondary" />{" "}
          <Link href="/profile" className="text-secondary">
            Profile
          </Link>
        </div>
        <div className="flex gap-2 justify-start items-center ">
          <Settings className="w-4 h-4 text-secondary" />{" "}
          <Link href="/settings" className="text-secondary">
            Settings
          </Link>
        </div>
      </div>
      <div
        className="flex gap-2 justify-start items-center px-4"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 text-error" />{" "}
        <span className="text-error">Logout</span>
      </div>
    </div>
  );
};

export default Profile;
