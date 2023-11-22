import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default page;
