import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useFirebase } from "@/context/FirebaseProvider";

const AuthHeader = () => {
  const { user, signOut } = useFirebase();

  const createInitials = (name: string) => {
    let initials: any = name?.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full text-emerald-800"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL!} alt={user.displayName!} />
              <AvatarFallback>
                {createInitials(user.displayName!) || "You"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.displayName || "You"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/profile" className="cursor-pointer">
            <DropdownMenuItem>Update Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <motion.button
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <NavLink
        to="/signin"
        className="p-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
      >
        Sign in
      </NavLink>
    </motion.button>
  );
};

export default AuthHeader;
