export interface MicrositeData {
    location: string;
    name: string; // assuming this is the project name
}

export async function fetchMicrosites(): Promise<MicrositeData[]> {
    const res = await fetch('https://api.realtyfocus.info/api/microsites/');
    if (!res.ok) {
        throw new Error('Failed to fetch microsites');
    }
    return res.json();
}
