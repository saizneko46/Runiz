// Menggunakan fetch API yang didukung Vercel langsung tanpa install dependensi tambahan
export default async function handler(req, res) {
    const targetURL = 'https://github.com/saizneko46/Runiz/tree/main/api'; // Ganti dengan URL yang ingin Anda pantau

    try {
        const response = await fetch(targetURL);
        
        if (response.ok) {
            console.log(`Website ${targetURL} is up. Status: ${response.status}`);
            res.status(200).json({ message: `Website is up! Status: ${response.status}` });
        } else {
            console.log(`Website ${targetURL} might be down. Status: ${response.status}`);
            res.status(response.status).json({ message: `Website might be down. Status: ${response.status}` });
        }
    } catch (error) {
        console.error(`Error pinging ${targetURL}:`, error);
        res.status(500).json({ message: `Error pinging website: ${error.message}` });
    }
          }
