import { auth } from "@/auth";
import { ButtonLogout } from "@/src/components/ui/buttons";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>TRD Caribe Shop</h1>
      <ButtonLogout/>
      <pre>
        {JSON.stringify({session})}
      </pre>
    </div>
  );
}
