export interface MicrositeData {
    location: string;
    name: string; // assuming this is the project name
}

export async function fetchMicrosites(): Promise<MicrositeData[]> {
    const res = await fetch('http://localhost:4000/api/microsites/');
    if (!res.ok) {
        throw new Error('Failed to fetch microsites');
    }
    return res.json();
}
