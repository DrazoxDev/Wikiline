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
            <div className="flex items-center gap-2">
                <img className="size-10" src="/src/assets/images/Logo WikiLine.svg" alt="Logo" />
                <a href="/" className="text-3xl text-gray-900 font-soustitre leading-none">Wikiline</a>
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
