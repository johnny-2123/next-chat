import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
      <SignOutButton />
    </div>
  );
};

export default page;
