import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useFirebase } from "./context/FirebaseProvider";
import { z } from "zod";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpWithCredentials, user } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const signUpForm = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateForm = signUpForm.safeParse({ email, password });
    if (validateForm.success) {
      const result = await signUpWithCredentials(email, password);
      if (result) {
        navigate("/");
      }
    } else {
      validateForm.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
    }
  };

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
            <Link className="underline text-emerald-800 font-bold" to="/signin">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="min-w-[350px] flex flex-col gap-4 justify-center items-center"
          >
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
