interface RotatingCircleProps {
  url: string;
  artist: string;
  songTitle: string;
}


export default function RotatingCircle({ url, artist, songTitle }: RotatingCircleProps) {
  return (
    <div className="flex items-center w-[275px] bg-primary p-2 rounded-lg shadow-lg">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary text-s font-body px-2 py-1 rounded-full">
        Now Playing
      </div>
      <div className="relative flex-shrink-0 w-[75px] h-[75px]">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-full animate-spin-slow"
          style={{ backgroundImage: `url(${url})`, clipPath: 'circle(50%)' }}
        ></div>
      </div>
      <div className="ml-2 overflow-hidden text-left">
        <div className="font-body font-bold text-accent truncate text-xl" style={{ maxWidth: '200px' }}>{songTitle}</div>
        <div className="font-body text-accent truncate" style={{ maxWidth: '200px' }}>{artist}</div>
      </div>
    </div>
  );
}