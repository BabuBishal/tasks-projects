import { redirect } from "next/navigation";

type Params = {
  locale?: string;
};

export default async function Home({ params }: { params: Promise<Params> }) {
  const { locale } = await params;

  redirect(`/${locale}/dashboard`);
}
