/**
 * Auto-loads every photo inside  src/assets/experience/<folder>/
 *
 * Cara pakai:
 *  1. Taruh foto di folder yang sesuai (lihat `id` di Experience.tsx).
 *  2. Urutan foto mengikuti nama file  (01-xxx.jpg, 02-xxx.jpg, ...).
 *  3. Nama file setelah angka otomatis jadi caption:
 *       "01-praktikum-iot.jpg"  ->  "Praktikum iot"
 *     Kalau nama file hanya angka / IMG_1234, caption tidak ditampilkan.
 */

export interface ExperiencePhoto {
  src: string;
  caption?: string;
}

const modules = import.meta.glob(
  '../assets/experience/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const toCaption = (fileName: string): string | undefined => {
  const base = fileName
    .replace(/\.[^.]+$/, '')            // buang ekstensi
    .replace(/^[\d\s._-]+/, '')         // buang angka urutan di depan
    .replace(/[-_]+/g, ' ')             // - dan _ jadi spasi
    .trim();

  // Abaikan nama bawaan kamera / screenshot
  if (!base || /^(img|dsc|image|photo|screenshot|whatsapp)/i.test(base)) return undefined;
  return base.charAt(0).toUpperCase() + base.slice(1);
};

const byFolder: Record<string, { file: string; photo: ExperiencePhoto }[]> = {};

Object.entries(modules).forEach(([path, src]) => {
  const match = path.match(/experience\/([^/]+)\/([^/]+)$/);
  if (!match) return;
  const [, folder, file] = match;
  (byFolder[folder] ??= []).push({ file, photo: { src, caption: toCaption(file) } });
});

export const getExperiencePhotos = (folder: string): ExperiencePhoto[] =>
  (byFolder[folder] ?? [])
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
    .map((item) => item.photo);
