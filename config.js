// Koneksi Google Sheets opsional. Jika gagal, aplikasi tetap memakai data lokal.
window.BUKU_SAKU = {
  sheets: {
    jadwal: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsp5EGNW-EsghwFLUgFUp6AE8idXaPlzwtl5hSSJNvkTQI8qY9VLCPHw1X5_yKZg/pub?gid=1326021638&single=true&output=csv",
    pengumuman: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsp5EGNW-EsghwFLUgFUp6AE8idXaPlzwtl5hSSJNvkTQI8qY9VLCPHw1X5_yKZg/pub?gid=956249130&single=true&output=csv"
  },
  pollingMs: 300000
};
