﻿import Heading from "@/app/components/Heading";
import { getSession, getTokenWorkaround } from "@/app/actions/AuthActions";
import AuthTest from "@/app/session/AuthTest";
import { getToken } from "next-auth/jwt";

export default async function Session() {
  const session = await getSession();
  const token = await getTokenWorkaround();

  return (
    <div>
      <Heading title="Session dashboard" />

      <div className="bg-blue-22 border-2 border-blue-500">
        <h3 className="text-lg">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div className="mt-4">
        <AuthTest />
      </div>

      <div className="bg-green-22 mt-4 border-2 border-blue-500">
        <h3 className="text-lg">Token data</h3>
        <pre>{JSON.stringify(token, null, 2)}</pre>
      </div>
    </div>
  );
}
