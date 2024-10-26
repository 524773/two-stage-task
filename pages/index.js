export default function Home() {
  return <h1>Hello, Next.js!</h1>;
}
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Link href="/about">About Us</Link>
    </div>
  );
}
