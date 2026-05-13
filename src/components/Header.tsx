import { NavLink } from "react-router";

const navItems = [
    // { to: "/", label: "Accueil", bgColor: "bg-slate-600" }, 
    { to: "/commentJouer", label: "Comment jouer", bgColor: "text-black" },
    { to: "/inscription", label: "S'inscrire", bgColor: "couleur-vert border-2" },
    { to: "/connexion", label: "Connexion", bgColor: "bg-[var(--color-green)] couleur-blanc" },
];


const Header=()=> {
    return (
        <header className="p-4">
            <nav className="flex flex-wrap gap-4" aria-label="Navigation principale">
                <img src="" alt="" />
                <h1 className="text-3xl text-gray-900 mb-4 font-soustitre">Wikiline</h1>
                {navItems.map((item) =>(
                    <NavLink key={item.to} to={item.to} className={ `font-soustitre text-center rounded-lg ${item.bgColor}`}>{item.label}</NavLink>
                ))}
                
            </nav>

        </header>
    );
}
export default Header;
