import { useState, useRef } from "react";
import Header from "../components/Header";

const Profil = () => {
  const [username, setUsername] = useState("Gobzylou");
  const [avatarSrc, setAvatarSrc] = useState("/images/avatar.png");
  const [editUsername, setEditUsername] = useState("Gobzylou");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = {
    stats: [
      { label: "Parties jouées", value: 42 },
      { label: "Victoires", value: 17 },
      { label: "Meilleur score", value: 980 },
    ],
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewSrc(URL.createObjectURL(file));
    setSaved(false);
  };

  const handleSave = () => {
    setUsername(editUsername);
    if (previewSrc) setAvatarSrc(previewSrc);
    setPendingFile(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const hasChanges =
    editUsername !== username || previewSrc !== null;

  return (
    <>
      <Header />
      <section className="">
        <div className="flex flex-col items-center mb-10">
          <h2 className="font-soustitre text-3xl text-black">Affichage de votre profile</h2>
          <h1 className="font-titre text-[#21897E] text-7xl lg:text-8xl">Profile</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">

          <div className="bg-[#21897E] rounded-2xl p-8 flex-1">
            <h3 className="font-soustitre text-[#E0E2DB] text-2xl mb-6">Nombres de parties jouées en entrainement</h3>
            <div className="flex gap-4">
              {user.stats.map((stat) => (
                <div key={stat.label} className="bg-[#E0E2DB] rounded-xl flex-1 aspect-square flex flex-col items-center justify-center gap-2 p-4">
                  <span className="font-titre text-[#21897E] text-4xl">
                    {stat.value}
                  </span>
                  <span className="font-soustitre text-[#21897E] text-xs text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="font-soustitre text-[#E0E2DB] text-2xl mb-6">Nombres de parties classiques jouées</h3>
            <div className="flex gap-4">

                <div className="bg-[#E0E2DB] rounded-xl flex-1 aspect-square flex flex-col items-center justify-center gap-2 p-4">
                  <span className="font-titre text-[#21897E] text-4xl">
                    
                  </span>
                  <span className="font-soustitre text-[#21897E] text-xs text-center">
                    
                  </span>
                </div>
              
            </div>

          </div>

          <div className="bg-[#21897E] rounded-2xl p-8 flex flex-col items-center justify-center gap-5 w-full lg:w-80">
            <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-black cursor-pointer group"onClick={() => fileInputRef.current?.click()}>
              <img
                src={previewSrc ?? avatarSrc}
                alt={username}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-soustitre text-[#E0E2DB] text-sm text-center px-2">
                  Changer l'image
                </span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <input
              type="text"
              value={editUsername}
              onChange={(e) => {
                setEditUsername(e.target.value);
                setSaved(false);
              }}
              maxLength={20}
              className="bg-[#E0E2DB] text-[#21897E] font-soustitre text-xl text-center rounded-xl px-4 py-2 w-full outline-none focus:ring-2 focus:ring-black/30"
            />

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`w-full py-3 rounded-xl font-soustitre text-lg transition-all
                ${
                  hasChanges
                    ? "bg-[#E0E2DB] text-[#21897E] hover:bg-white cursor-pointer"
                    : "bg-[#E0E2DB]/40 text-[#E0E2DB]/60 cursor-not-allowed"
                }`}
            >
              {saved ? "✓ Sauvegardé !" : "Valider les modifications"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profil;