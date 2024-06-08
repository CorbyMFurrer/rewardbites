import ButtonAccount from "@/components/ButtonAccount";
import FileUploadButton from "@/components/FileUpload";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("todos").select();

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <FileUploadButton />
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Contact cfurrer@college.harvard.edu for access!
        </h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </main>
  );
}
