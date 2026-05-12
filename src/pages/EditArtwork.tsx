
import type { SubmitEventHandler } from "react";
const EditArtwork = () => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
  };

  const handleReset = () => {};

  return (
    <section className="px-4 duration-300 bg-white rounded-lg shadow-md">
      <h2>Modifier l'œuvre</h2>

      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Titre</label>
          <input type="text" name="title" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Auteur</label>
          <input type="text" name="artist" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Année</label>
          <input type="number" name="year" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea name="description" className="w-full p-2 border border-gray-300 rounded-md" rows={8} />
        </div>

        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditArtwork;
