import { NavLink } from "react-router";

const navItems = [
    // { to: "/", label: "Accueil", bgColor: "bg-slate-600" }, 
    { to: "/commentJouer", label: "Comment jouer", bgColor: "text-black" },
    { to: "/inscription", label: "S'inscrire", bgColor: "couleur-vert border-2" },
    { to: "/connexion", label: "Connexion", bgColor: "bg-[var(--color-green)] couleur-blanc" },
];


const Header=()=> {
    return (
        <header className="p-4 flex flex-wrap items-center justify-between">
            <div>
                <img src="" alt="" />
                <a href="/" className="text-3xl text-gray-900 mb-4 font-soustitre">Wikiline</a>
            </div>
            
            <nav className="flex flex-wrap gap-4" aria-label="Navigation principale">
                {navItems.map((item) =>(
                    <NavLink key={item.to} to={item.to} className={ `px-4 py-2 font-soustitre rounded-lg ${item.bgColor}`}>{item.label}</NavLink>
                ))}
                
            </nav>

        </header>
    );
}
export default Header;
