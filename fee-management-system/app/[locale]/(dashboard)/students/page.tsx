import Link from "next/link";

const Students = async () => {
  const posts = await fetch("https://api.vercel.app/blog", {
    cache: "no-store",
  }).then((res) => res.json());
  return (
    <ul>
      {posts &&
        posts.map((post: any) => (
          <Link key={post.id} href={`/students/${post.id}`}>
            <li>{post.title}</li>
          </Link>
        ))}
    </ul>
  );
};

export default Students;
