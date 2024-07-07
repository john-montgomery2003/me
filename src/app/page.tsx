import RotatingCircle from "../components/rotatingCircle";

async function getRecentlyPlayedTrack(accessToken: string): Promise<{ url: string, songTitle: string, artist: string }> {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        next: { revalidate: 300 }, 
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recently played track');
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
        throw new Error('No recently played tracks found.');
    }

    const track = data.items[0].track;
    const coverArtUrl = track.album.images[0].url;
    const songName = track.name;
    const artist = track.artists.map((artist: { name: string }) => artist.name).join(', ');

    return { url: coverArtUrl, songTitle: songName, artist: artist };
}

async function refreshAccessToken(): Promise<string> {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const refreshToken = process.env.REFRESH_TOKEN!;

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        next: { revalidate: 300 }, 
    });

    if (!response.ok) {
        throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    return data.access_token;
}

export default async function Home() {
    const at = await refreshAccessToken();
    const recentlyPlayedTrack = await getRecentlyPlayedTrack(at);

    return (
        <section className="bg-[url('/home.jpg')] bg-cover bg-center h-screen flex flex-col justify-start relative">
            <div className="text-center pt-10 w-full">
                <h1 className="text-primary font-bold text-5xl font-header">John Montgomery</h1>
                <h4 className="text-secondary font-light text-4xl font-body">software engineer</h4>
            </div>
            <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2">
                {RotatingCircle(recentlyPlayedTrack)}
            </div>
        </section>
    );
}
