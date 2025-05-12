import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const pictures = [
  "baby-1",
  "baby-2",
  "oneish",
  "twoish-1",
  "tw0ish",
  "twoish-3",
  "three-ish",
  "threeish-1",
  "threeish-2",
  "threeish-3",
  "fourish-1",
  "fiveish-",
  "fiveish-1",
  "fiveish-2",
  "fiveish-8",
  "sixish-1",
  "sixish-2",
  "sixish-3",
  "sixish-5",
  "tenish-2",
  "tenish-1",
  "DSC00680",
  "HighSchool-1",
  "test",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    audio.loop = true;
    audio.play().catch(() => {});

    const handleFirstClick = () => {
      audio.muted = false;
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      audio.pause();
    };
  }, []);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <audio
          ref={audioRef}
          src="/audios/timeofyourlife.mp3"
          style={{ display: "none" }}
        />

<a
  className="pointer-events-auto absolute top-4 left-4"
  href="venmo://users/Owen-Perkins-6"
  onClick={(e) => {
    if (!navigator.userAgent.includes("Mobile")) {
      e.preventDefault();
      window.open("https://venmo.com/Owen-Perkins-6", "_blank");
    }
  }}
>
  <img className="w-60 h-auto" src="/images/OwenVenmo.png" />
</a>


        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black">
              Owen Perkins
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Senior
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Class of
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              2025
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Owen
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Perkins
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Class of
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              2025
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black">
              Blue Valley North
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Mustangs
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              2025
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Owen Perkins
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Blue
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Valley
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              North
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Mustangs
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
