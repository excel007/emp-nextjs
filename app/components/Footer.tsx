export default function Footer() {
    return (
        <footer>
            <div className="w-full flex items-center justify-between gap-4 p-4 mx-auto bg-slate-400">
                <p>@{new Date().getFullYear()}</p>
                <p>Created by ABC company</p>
            </div>
        </footer>
    );
}