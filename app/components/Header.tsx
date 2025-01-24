import Link from "next/link";
export default function Header() {
    return (
        <header>
            <div className="w-full flex items-center justify-between gap-4 p-4 mx-auto bg-slate-400">
                <p>EMP Logo</p>
                <nav>
                    <ul className="flex gap-4">
                        <li><Link href={"/department"}>Department</Link></li>
                        <li><Link href={"/employee"}>Employee</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}