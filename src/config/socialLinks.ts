/**
 * ═══════════════ ISI KONTAKMU DI SINI ═══════════════
 * Cukup ganti teks di dalam tanda kutip pada bagian CONTACT di bawah.
 * Kontak yang dikosongkan ('') otomatis TIDAK ditampilkan di halaman Contact,
 * jadi kamu bebas menghapus yang tidak diperlukan.
 */
const CONTACT = {
  // Email
  email: 'putrifebrihandini@gmail.com',

  // WhatsApp: kode negara + nomor, TANPA tanda + dan TANPA 0 di depan.
  // Contoh: 0812-3456-7890  →  6281234567890
  whatsappNumber: '6283155869728',
  // Tulisan yang sudah terisi otomatis saat orang membuka chat WhatsApp
  whatsappMessage: '',
  // Nomor yang ditampilkan di kartu (bebas format)
  whatsappDisplay: '+62 831-5586-9728',

  // Link profil lengkap (salin dari browser)
  linkedin: 'https://www.linkedin.com/in/putri-harmonia-b04132179?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  instagram: 'https://www.instagram.com/pputrifebrii',
  linkedinDisplay: 'Putri Harmonia',
};
// ═════════════════════════════════════════════════════

const clean = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const igHandle = (url: string) => {
  const name = url.replace(/\/$/, '').split('/').pop() ?? '';
  return name ? `@${name}` : '';
};

export const socialLinks = {
  linkedin: CONTACT.linkedin.split('?')[0],  email: CONTACT.email,
  instagram: CONTACT.instagram,
  whatsapp: CONTACT.whatsappNumber
    ? `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`
    : '',

  // Teks yang ditampilkan di kartu
  display: {
    linkedin: CONTACT.linkedinDisplay || clean(CONTACT.linkedin.split('?')[0]),    email: CONTACT.email,
    instagram: igHandle(CONTACT.instagram),
    whatsapp: CONTACT.whatsappDisplay,
  },
};

export type ContactId = 'email' | 'whatsapp' | 'linkedin' | 'instagram';

export interface ContactItem {
  id: ContactId;
  label: string;
  cta: string;
  href: string;
  display: string;
  external: boolean;
}

/** Urutan di sini = urutan kartu di halaman Contact. Yang href-nya kosong disembunyikan. */
export const contactItems: ContactItem[] = (
  [
    { id: 'email', label: 'Email', cta: 'Send Email', href: CONTACT.email ? `mailto:${CONTACT.email}` : '', display: socialLinks.display.email, external: false },
    { id: 'whatsapp', label: 'WhatsApp', cta: 'Chat on WhatsApp', href: socialLinks.whatsapp, display: socialLinks.display.whatsapp, external: true },
    { id: 'linkedin', label: 'LinkedIn', cta: 'Connect', href: CONTACT.linkedin, display: socialLinks.display.linkedin, external: true },
    { id: 'instagram', label: 'Instagram', cta: 'Follow', href: CONTACT.instagram, display: socialLinks.display.instagram, external: true },
  ] as ContactItem[]
).filter((item) => item.href);

export default socialLinks;
