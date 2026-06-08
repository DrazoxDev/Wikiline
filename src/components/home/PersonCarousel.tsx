import { useEffect, useState } from "react";
import { CAROUSEL_PERSON_TITLES } from "../../data/carouselPersons";
import { fetchPersonSummary } from "../../services/wikipedia/wikipedia.api";

type CarouselPerson = {
  name: string;
  imageUrl: string;
};

  function CarouselItem({ person }: { person: CarouselPerson }) {
    return (
      <div className="flex flex-col items-center mx-5 shrink-0 w-36 md:w-44">
        <div className="bg-[#ffffff] rounded-3xl w-full shadow-lg overflow-hidden">

            {person.imageUrl ? (
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-full h-44 md:h-52 object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-44 md:h-52 flex items-center justify-center bg-[#E0E2DB] text-[#21897E] text-sm">
                ?
              </div>
            )}
  
        </div>

        <p className="font-titre text-base md:text-lg mt-3 text-center leading-tight">
          {person.name}
        </p>
      </div>
    );
  }

function CarouselSkeleton() {
  return (
    <div className="flex mx-5 shrink-0 w-36 md:w-44">
      <div className="bg-[#1a1a1a] rounded-3xl p-2 w-full animate-pulse">
        <div className="rounded-2xl border-2 border-white/30 h-44 md:h-52 bg-white/10" />
      </div>
    </div>
  );
}

export default function PersonCarousel() {
  const [persons, setPersons] = useState<CarouselPerson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.allSettled(
        CAROUSEL_PERSON_TITLES.map(async (title) => {
          const summary = await fetchPersonSummary(title);
          return {
            name: summary.title,
            imageUrl: summary.thumbnail?.source ?? "",
          };
        }),
      );

      if (cancelled) return;

      const loaded = results
        .filter(
          (r): r is PromiseFulfilledResult<CarouselPerson> =>
            r.status === "fulfilled",
        )
        .map((r) => r.value)
        .filter((p) => p.imageUrl);

      setPersons(loaded);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full overflow-hidden mt-10">
        <div className="flex justify-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (persons.length === 0) {
    return (
      <p className="text-center font-soustitre mt-10 text-gray-500">
        Impossible de charger les personnalités depuis Wikipédia.
      </p>
    );
  }

  const track = [...persons, ...persons];

  return (
    <div className="w-full overflow-hidden mt-10 marquee-container">
      <div className="marquee-track">
        {track.map((person, index) => (
          <CarouselItem key={`${person.name}-${index}`} person={person} />
        ))}
      </div>
    </div>
  );
}
