import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <div>
                <Link href="/">Accueil</Link>
                <Link href="/methodologie">Méthodologie</Link>
                <Link href="/citations">Citations</Link>
                <Link href="/liens">Liens</Link>
            </div>
        </nav>
    )
}