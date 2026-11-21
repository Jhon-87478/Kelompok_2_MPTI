(function () {
  'use strict';
  const { esc, api } = SP;
  const page = document.body.dataset.page;
  const link = (href, key, text) => `<a href="${href}" class="${page === key ? 'active' : ''}">${text}</a>`;

  document.getElementById('site-header').innerHTML = `
  <header class="site-header"><div class="container">
    <a class="brand" href="index.html"><img src="img/logo.svg" alt=""><span><b>SIMA-PORT</b><small>Sistem Informasi Manajemen Pelabuhan</small></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Navigasi utama">
      ${link('index.html', 'home', 'Beranda')}
      ${link('jadwal.html', 'jadwal', 'Jadwal Kapal')}
      <div class="dd"><button type="button" aria-haspopup="true">Pelabuhan &#9662;</button><div class="menu" id="menu-pelabuhan"></div></div>
      ${link('tentang.html', 'tentang', 'Tentang')}
      <a class="btn" href="login.html">Login Admin</a>
    </nav>
  </div></header>`;

  document.getElementById('site-footer').innerHTML =
    '<footer class="site-footer">&copy; 2026 SIMA-PORT | Universitas Kristen Indonesia Maluku</footer>';

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  api('/api/pelabuhan').then(list => {
    document.getElementById('menu-pelabuhan').innerHTML =
      list.map(p => `<a href="jadwal.html?pelabuhan=${p.id}">Pelabuhan ${esc(p.nama)}</a>`).join('');
  }).catch(() => { });
})();
