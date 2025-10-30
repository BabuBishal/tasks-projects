import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export async function getStaticProps() {
  const res = await fetch("https://fake.jsonmockapi.com/products?length=10");
  const data = await res.json();

  return { props: { data } };
}
export default function Home({ data }: any) {
  // console.log(data)
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <div>
        <h2>Products</h2>
        <br />
        <ul>
          {data && data.length > 0 ? (
            data.map((product: any) => (
              <li key={product.id}>{product.productName}</li>
            ))
          ) : (
            <li>No products found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
