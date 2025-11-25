import { LogOut, Settings, User, Mail, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileProps {
  profilePicture: string | null;
}

const Profile = ({ profilePicture }: ProfileProps) => {
  const { data } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push(`/login`);
  };

  return (
    <div className="absolute top-12 bg-card py-3 right-0 w-72 border border-border rounded-lg shadow-lg flex flex-col">
      {/* User Info Section */}
      <div className="px-4 pb-3 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-border">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-semibold text-primary truncate">
              {data && data.user ? data.user.name : "User"}
            </h5>
            <p className="text-xs text-muted truncate flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data && data.user ? data.user.email : ""}
            </p>
          </div>
        </div>
        {/* Role Badge */}
        <div className="flex items-center gap-1 mt-2">
          <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            Administrator
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <Link
          href="/profile"
          className="flex gap-3 items-center px-4 py-2.5 hover:bg-accent transition-colors"
        >
          <User className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">My Profile</span>
        </Link>
        <Link
          href="/settings"
          className="flex gap-3 items-center px-4 py-2.5 hover:bg-accent transition-colors"
        >
          <Settings className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">Settings</span>
        </Link>
      </div>

      {/* Logout Section */}
      <div className="border-t border-border pt-2">
        <button
          onClick={handleLogout}
          className="flex gap-3 items-center px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-600 dark:text-red-400 font-medium">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
