import Header from "../components/Header";
import { PersonalityCard } from "../components/cards/PersonalityCard";

const CommentJouer = () => {
    return (
        <>
            <Header />
            <section className="container mx-auto p-4">

                <div className="flex flex-col items-center">
                    <h2 className="font-soustitre text-4xl">Explication des règles du jeu</h2>
                    <h2 className="text-[#21897E] font-titre text-8xl">WikiLine</h2>
                </div>

                <div className="mb-10">
                    <p className="font-soustitre text-lg">Wikiline est un jeu de cartes inspiré du principe du jeu Timeline.</p>
                    <p className="font-soustitre text-lg">Le but est de replacer correctement des personnalités connues sur une ligne du temps, en fonction d'un événement précis de leur vie (naissance, mort, exploit, etc.).</p>
                    <p className="font-soustitre text-lg">Le jeu repose sur votre culture générale et votre capacité à estimer des dates clés de l'histoire et des personnalités célèbres.</p>
                </div>

                <div className="flex gap-8 mb-12">
                    <div className="flex-[3]">
                        <p className="text-[#21897E] font-bold text-lg mb-2">Objectif du jeu :</p>
                        <p className="mb-2">Être le premier joueur à poser toutes ses cartes correctement sur la frise chronologique. Le joueur qui se débarrasse de toutes ses cartes en premier remporte la partie.</p>
                        <p className="font-bold mb-1">Mise en place</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Mélangez toutes les cartes personnalité face cachée.</li>
                            <li>Chaque joueur reçoit un certain nombre de cartes selon le niveau de difficulté choisi (Facile : 3 cartes, Normal : 5 cartes, Difficile : 7 cartes).</li>
                            <li>Une première carte est tirée au hasard et placée au centre de la table, <strong>date visible</strong> — elle sert de point de départ à la frise chronologique.</li>
                            <li>Les cartes en main des joueurs sont gardées <strong>face cachée</strong> : seule la photo et le nom de la personnalité sont visibles, pas la date.</li>
                            <li>Le joueur le plus jeune commence la partie.</li>
                        </ul>
                    </div>

                    <div className="flex-[1]">
                        <PersonalityCard
                            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/440px-President_Barack_Obama.jpg"
                            name="Barack Obama"
                            description="Premier président noir des États-Unis avec un mandat allant du 20 janvier 2009 au 20 janvier 2017"
                        />
                    </div>
                </div>

                <div className="flex gap-8 mb-12">
                    <div className="flex-[1]">
                        <PersonalityCard
                            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Queen_Elizabeth_II_March_2015.jpg/440px-Queen_Elizabeth_II_March_2015.jpg"
                            name="Élisabeth II"
                            description="Reine du Royaume-Uni ayant régné du 6 février 1952 au 8 septembre 2022."
                        />
                    </div>


                    <div className="flex-[3]">
                        <p className="text-[#21897E] font-bold text-lg mb-2">Déroulement d'un tour</p>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Le joueur dont c'est le tour choisit librement une carte de sa main.</li>
                            <li>Il annonce à voix haute où il souhaite placer la carte sur la frise :
                                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                                    <li><strong>Avant</strong> toutes les cartes déjà posées</li>
                                    <li><strong>Après</strong> toutes les cartes déjà posées</li>
                                    <li><strong>Entre</strong> deux cartes déjà posées</li>
                                </ul>
                            </li>
                            <li>Il retourne alors sa carte pour révéler la date de l'événement.</li>
                            <li>Si la date est correctement placée, la carte reste sur la frise et le joueur pioche une nouvelle carte dans le tas.</li>
                            <li>Si la date est mal placée, la carte est défaussée et le joueur perd une vie. Il pioche tout de même une nouvelle carte.</li>
                            <li>Le tour passe ensuite au joueur suivant dans le sens des aiguilles d'une montre.</li>
                        </ol>
                    </div>
                </div>

                <div className="flex gap-8 mb-12">
                    <div className="flex-[3]">
                        <p className="text-[#21897E] font-bold text-lg mb-2">Validation & Fin de partie</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Position correcte :</strong> la carte est retournée et intégrée à la frise, la date désormais visible pour tous les joueurs. Le joueur pioche une nouvelle carte.</li>
                            <li><strong>Position incorrecte :</strong> la carte est retirée du jeu et défaussée. Le joueur perd une vie et pioche une nouvelle carte.</li>
                            <li><strong>Vies :</strong> chaque joueur commence avec 3 vies. À 0 vie, le joueur est éliminé.</li>
                            <li><strong>Victoire :</strong> le premier joueur à poser toutes ses cartes en main remporte la partie.</li>
                        </ul>
                        <p className="mt-4 text-[#21897E] font-bold text-lg">Types de cartes</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                            <li><strong>Cartes Personnalité :</strong> représentent un événement marquant de la vie d'une personnalité célèbre (naissance, mort, exploit sportif, victoire électorale, etc.).</li>
                            <li><strong>Cartes Joker :</strong> permettent de rejouer un tour sans perdre de vie en cas d'erreur.</li>
                            <li><strong>Cartes Événement :</strong> représentent un événement historique mondial plutôt qu'une personnalité.</li>
                        </ul>
                    </div>

                    <div className="flex-[1]">
                        <PersonalityCard
                            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Karch_Kiraly_2012.jpg/440px-Karch_Kiraly_2012.jpg"
                            name="Charles Kiraly"
                            description="Ancien joueur et entraîneur américain de volley-ball, triple champion olympique."
                        />
                    </div>
                </div>

            </section>
        </>
    );
};
export default CommentJouer;