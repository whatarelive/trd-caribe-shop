import { auth } from "@/auth.config";
import { ButtonLogout } from "@/components/ui/buttons";

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
