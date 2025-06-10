export interface MicrositeData {
    location: string;
    name: string; // assuming this is the project name
}

export async function fetchMicrosites(): Promise<MicrositeData[]> {

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Ensure API_BASE_URL exists before making the request
    if (!API_BASE_URL) {
        console.warn("NEXT_PUBLIC_API_BASE_URL not set");
        return [];
    }
    const res = await fetch(`${API_BASE_URL}/microsites`);
    //const res = await fetch('https://api.realtyfocus.info/api/microsites/');
    if (!res.ok) {
        throw new Error('Failed to fetch microsites');
    }
    return res.json();
}
