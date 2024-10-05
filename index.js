const express = require('express');
const fetch = require('node-fetch');
const app = express();

// URL dari website target yang ingin Anda pantau
const targetURL = 'https://target-website.com'; // Ganti dengan URL target Anda

// Interval untuk melakukan ping ke website target (misalnya setiap 5 menit)
const interval = 5 * 60 * 1000;  // 5 menit dalam milidetik

// Fungsi untuk ping halaman target
function pingWebsite() {
    fetch(targetURL)
        .then(response => {
            if (response.ok) {
                console.log(`Website ${targetURL} is up. Status: ${response.status}`);
            } else {
                console.log(`Website ${targetURL} might be down. Status: ${response.status}`);
            }
        })
        .catch(err => {
            console.error(`Error pinging ${targetURL}:`, err.message);
        });
}

// Jalankan ping pertama kali saat server dimulai
pingWebsite();

// Ping secara berkala berdasarkan interval yang ditentukan
setInterval(pingWebsite, interval);

// Server untuk memastikan aplikasi tetap berjalan
app.get('/', (req, res) => {
    res.send('Uptime bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
