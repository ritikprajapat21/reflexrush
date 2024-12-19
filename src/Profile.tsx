import { useNavigate } from "react-router-dom";
import { useFirebase } from "./context/FirebaseProvider";
import { useEffect, useState } from "react";
import { Separator } from "./components/ui/separator";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { z } from "zod";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateUserProfile } = useFirebase();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  const updateUserProfileForm = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateForm = updateUserProfileForm.safeParse({ name });
    console.log(validateForm);
    if (validateForm.success) {
      updateUserProfile(name);
    } else {
      validateForm.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
    }
  };

  return (
    <section className="mt-8 space-y-3 w-9/12 mx-auto">
      <h3 className="text-2xl font-bold">Profile</h3>
      <Separator />
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Name
          </Label>
          <div className="mt-1">
            <Input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value.trim())}
              defaultValue={user?.displayName!}
            />
          </div>
        </div>

        <Button className="bg-emerald-800 hover:bg-emerald-700 text-white w-fit">
          Update Profile
        </Button>
      </form>
    </section>
  );
};

export default Profile;
