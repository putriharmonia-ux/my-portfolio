import { useEffect } from 'react';

/**
 * Memberi animasi "muncul saat di-scroll" ke elemen yang cocok dengan selector,
 * tanpa perlu mengubah komponen sectionnya.
 * Class sementara (rv / rv-in) dilepas lagi setelah animasi selesai,
 * jadi style asli elemen (hover, transition, dll) tidak terganggu.
 */
export function useAutoReveal(selectors: string[]) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sel = selectors.join(',');
    if (!sel) return;

    const pending = new Set<HTMLElement>();

    const reveal = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      io.unobserve(el);
      el.classList.add('rv-in');
      el.addEventListener(
        'animationend',
        () => {
          el.classList.remove('rv', 'rv-in');
          el.style.removeProperty('--rv-delay');
        },
        { once: true }
      );
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target as HTMLElement)),
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    const tag = () => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.dataset.rvDone) return;
        el.dataset.rvDone = '1';
        const idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.setProperty('--rv-delay', `${(idx % 4) * 90}ms`);
        el.classList.add('rv');
        pending.add(el);
        io.observe(el);
      });
    };

    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        tag();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    tag();

    // jaring pengaman: elemen yang terlewat / tadinya tersembunyi tidak boleh tetap transparan
    const safety = window.setInterval(() => {
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || (r.height > 0 && r.top < window.innerHeight * 0.9 && r.bottom > 0)) reveal(el);
      });
    }, 700);

    return () => {
      mo.disconnect();
      io.disconnect();
      window.clearInterval(safety);
      pending.forEach((el) => el.classList.remove('rv', 'rv-in'));
      pending.clear();
    };
  }, [selectors]);
}
