/**
 * ASCII art di bagian About (hero, sisi kanan).
 *
 * Tiap karakter diletakkan di posisi (kolom, baris) sendiri, jadi susunannya
 * TIDAK bergeser walaupun font di browser berbeda-beda (☆ ∀ ⊃ ⊂ dsb).
 *
 *  ch   : karakternya
 *  col  : posisi tengah karakter, dalam satuan "sel" (1 sel ≈ 0.6em)
 *  row  : nomor baris (mulai dari 0)
 *  star : true = karakter bintang, ikut berkelip pelan
 *
 * Urutan array = urutan muncul saat efek mengetik (kiri → kanan, atas → bawah).
 */
export interface AsciiGlyph {
  ch: string;
  col: number;
  row: number;
  star?: boolean;
}

export const ASCII_COLS = 21;
export const ASCII_ROWS = 6;

export const ASCII_GLYPHS: AsciiGlyph[] = [
  // ☆    .  * ☆
  { ch: '☆', col: 6.9, row: 0, star: true },
  { ch: '.', col: 11.4, row: 0 },
  { ch: '*', col: 14.2, row: 0, star: true },
  { ch: '☆', col: 16.9, row: 0, star: true },

  // ☆*  ∩  ^__^ .
  { ch: '☆', col: 1.5, row: 1, star: true },
  { ch: '*', col: 3.7, row: 1, star: true },
  { ch: '∩', col: 6.7, row: 1 },
  { ch: '^', col: 10.3, row: 1 },
  { ch: '_', col: 11.5, row: 1 },
  { ch: '_', col: 12.6, row: 1 },
  { ch: '^', col: 13.7, row: 1 },
  { ch: '.', col: 15, row: 1 },

  // .\(·∀·)☆ *
  { ch: '.', col: 6.1, row: 2 },
  { ch: '\\', col: 7.3, row: 2 },
  { ch: '(', col: 8.4, row: 2 },
  { ch: '·', col: 9.7, row: 2 },
  { ch: '∀', col: 11.2, row: 2 },
  { ch: '·', col: 13, row: 2 },
  { ch: ')', col: 14.9, row: 2 },
  { ch: '☆', col: 16.9, row: 2, star: true },
  { ch: '*', col: 19.4, row: 2, star: true },

  // ☆*\      ⊃ .
  { ch: '☆', col: 5.4, row: 3, star: true },
  { ch: '*', col: 7.6, row: 3, star: true },
  { ch: '\\', col: 9.3, row: 3 },
  { ch: '⊃', col: 15.6, row: 3 },
  { ch: '.', col: 17.6, row: 3 },

  // ☆.  \  ⊂)*☆
  { ch: '☆', col: 7.1, row: 4, star: true },
  { ch: '.', col: 8.6, row: 4 },
  { ch: '\\', col: 11, row: 4 },
  { ch: '⊂', col: 13.7, row: 4 },
  { ch: ')', col: 15.4, row: 4 },
  { ch: '*', col: 16.9, row: 4, star: true },
  { ch: '☆', col: 18.9, row: 4, star: true },

  //      \)
  { ch: '\\', col: 12.9, row: 5 },
  { ch: ')', col: 14.1, row: 5 },
];
