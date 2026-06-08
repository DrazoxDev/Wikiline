type Props = {
  titre: string;
  nbretoiles: number;
  specificitee: string[];
}

const cards = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Marilyn_Monroe_-_publicity.JPG/440px-Marilyn_Monroe_-_publicity.JPG",
      rotate: "-rotate-12",
      top: "top-0",
      left: "left-0",
      zIndex: "z-10",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Justin_Bieber_in_2015.jpg/440px-Justin_Bieber_in_2015.jpg",
      rotate: "rotate-6",
      top: "top-4",
      left: "left-24",
      zIndex: "z-20",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Napoleon_on_the_Saint-Bernard_Pass%2C_David.jpg/440px-Napoleon_on_the_Saint-Bernard_Pass%2C_David.jpg",
      rotate: "-rotate-3",
      top: "top-32",
      left: "left-8",
      zIndex: "z-30",
      name: "Napoléon Bonaparte",
      desc: "Empereur de génie et stratège légendaire, dont le film le plus mémorable est son triomphe historique à Austerlitz.",
    },
  ];