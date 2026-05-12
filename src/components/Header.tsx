import { NavLink } from "react-router";

const navItems = [
    { to: "/", label: "Accueil", bgColor: "bg-slate-600" },
    { to: "/prepare-expo", label: "Préparer mon expo", bgColor: "bg-emerald-600" },
    { to: "/my-expo", label: "Voir mon expo", bgColor: "bg-indigo-600" },
    { to: "/admin", label: "Administrer", bgColor: "bg-rose-600" },
];


const Header=()=> {
    return (
        <header className="p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Exponia</h1>
            <nav className="flex flex-wrap gap-4" aria-label="Navigation principale">
                {navItems.map((item) =>(
                    <NavLink key={item.to} to={item.to} className={({isActive}) => `text-white px-4 py-2 rounded-lg ${item.bgColor} ${isActive ? "shadow-lg shadow-black/50" : ""}`}>{item.label}</NavLink>
                ))}
                
            </nav>

        </header>
    );
}
export default Header;
