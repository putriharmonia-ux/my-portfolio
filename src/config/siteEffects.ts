/**
 * Satu tempat untuk mengatur semua efek "hidup" di portofolio.
 * Ubah nilainya di sini, tidak perlu menyentuh komponen.
 */
export const siteEffects = {
  /** Opening page (layar pembuka) */
  intro: {
    enabled: true,
    /** true = hanya tampil sekali per sesi browser (refresh tidak mengulang) */
    oncePerSession: false,
    /** lama opening sebelum otomatis masuk (milidetik) */
    durationMs: 10000,
    subtitle: '[ Portofolio ]',
    byLabel: 'by',
    name: 'Putri Febrihandini Harmonia',
    footerLeft: 'Industrial Engineering Graduate',
    footerRight: 'Bandung, Indonesia',
  },

  /** Kursor animasi */
  cursor: {
    enabled: true,
    /** 'star' = bintang berkilau | 'cat' = kepala kucing + jejak telapak kaki */
    variant: 'star' as 'star' | 'cat',
  },

  /** Bintang/glitter yang melayang pelan di latar */
  ambientStars: true,

  /** Garis progres scroll di paling atas halaman */
  scrollProgress: true,

  /** Pemisah animasi antar-section (bola wol, jejak kaki kucing, ombak) */
  dividers: {
    enabled: true,
  },

  /** Elemen yang otomatis muncul dengan animasi saat di-scroll */
  autoReveal: ['section h2', 'section .grid > *', '#experience .max-w-4xl > *'],
};
