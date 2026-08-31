import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <div className="not-found-grid"/>
      <div className="not-found-card">
        <span className="not-found-code">404 / ARCHIVE GAP</span>
        <h1>THIS PAGE<br/><em>WASN&apos;T ARCHIVED.</em></h1>
        <p>The receipt you&apos;re looking for is not here. Return to the original 豆 archive trail.</p>
        <Link href="/" className="button button-dark">BACK TO 豆</Link>
      </div>
    </main>
  );
}
