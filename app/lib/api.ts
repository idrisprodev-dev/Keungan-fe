const BASE_URL = 'http://localhost:3000';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Mengambil token JWT dari pangkalan data peramban (browser)
  // Pengecekan 'window' wajib dilakukan di Next.js untuk menghindari error Server-Side Rendering (SSR)
  const token = typeof window !== 'undefined' ? localStorage.getItem('ohduit_jwt') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Jika token tersedia, sisipkan sebagai kunci otorisasi standar (Bearer)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    // Jika token kedaluwarsa atau tidak valid, arahkan pengguna untuk masuk kembali
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ohduit_jwt');
        window.location.href = '/'; 
      }
    }
    throw new Error(data.message || 'Terjadi kesalahan pada server');
  }

  return data;
}