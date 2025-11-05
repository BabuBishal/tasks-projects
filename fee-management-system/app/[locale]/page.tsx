import { redirect } from "next/navigation";

type Params = {
  locale?: string;
};

export default function Home({ params }: { params: Params }) {
  const locale = params?.locale ?? "en";

  redirect(`/${locale}/dashboard`);
}
