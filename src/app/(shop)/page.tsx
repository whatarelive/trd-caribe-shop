import { auth } from "@/auth";
import { Logoutbutton } from "@/src/components/ui/buttons";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>TRD Caribe Shop</h1>
      <Logoutbutton/>
      <pre>
        {JSON.stringify({session})}
      </pre>
    </div>
  );
}
