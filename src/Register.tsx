import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-7xl mx-auto mt-20 flex items-center justify-center"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-medium">Sign Up</CardTitle>
          <CardDescription>
            Already have an account? &nbsp;{" "}
            <Link className="underline text-emerald-800" to="/signin">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="min-w-[350px] flex flex-col gap-4 justify-center items-center">
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" />
            </div>
            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" />
            </div>
            <Button className="p-2 w-full bg-emerald-800 hover:bg-emerald-700 text-white rounded-md cursor-pointer">
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default Register;
