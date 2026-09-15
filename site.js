(function(){
  // Theme toggle
  var btn = document.getElementById('themebtn');
  var root = document.documentElement;
  function label(){
    var t = root.getAttribute('data-theme');
    var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if(btn) btn.textContent = dark ? 'Light' : 'Dark';
  }
  // Dark by default; a visitor's explicit choice (stored) wins
  var saved = null;
  try{ saved = localStorage.getItem('campus-site-theme'); }catch(e){}
  if(saved === 'dark' || saved === 'light'){
    root.setAttribute('data-theme', saved);
  } else {
    root.setAttribute('data-theme', 'dark');
  }
  if(btn){
    btn.addEventListener('click', function(){
      var t = root.getAttribute('data-theme');
      var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try{ localStorage.setItem('campus-site-theme', next); }catch(e){}
      label();
    });
    label();
  }

  // Image grids (board page)
  function buildGrid(id, base, alt){
    var grid = document.getElementById(id);
    if(!grid) return;
    var count = parseInt(grid.getAttribute('data-count') || '0', 10);
    var frag = document.createDocumentFragment();
    for(var i=1;i<=count;i++){
      var n = (i<10?'0':'')+i;
      var fig = document.createElement('figure');
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.src = base+n+'.jpg';
      img.alt = alt+' '+i;
      fig.appendChild(img);
      frag.appendChild(fig);
    }
    grid.appendChild(frag);
  }
  buildGrid('boardgrid', 'images/board/board_', 'Board image');
  buildGrid('pinsgrid', 'images/pins/pin_', 'Gathered image');

  // Image labels: page prefix + number (from body data-tag)
  var prefix = document.body.getAttribute('data-tag') || '';
  if(prefix){
    var figs = document.querySelectorAll('main figure');
    figs.forEach(function(fig, i){
      var tag = document.createElement('span');
      tag.className = 'imgtag';
      tag.textContent = prefix + (i+1);
      fig.appendChild(tag);
    });
  }

  // Videos: only one plays at a time
  document.addEventListener('play', function(e){
    if(e.target.tagName !== 'VIDEO') return;
    document.querySelectorAll('video').forEach(function(v){
      if(v !== e.target && !v.paused) v.pause();
    });
  }, true);

  // Lightbox
  var lb = document.getElementById('lightbox');
  if(lb){
    var lbimg = lb.querySelector('img');
    document.addEventListener('click', function(e){
      var t = e.target;
      if(t.tagName === 'IMG' && t.closest('figure')){
        lbimg.src = t.src;
        lb.classList.add('open');
      } else if (lb.classList.contains('open')){
        lb.classList.remove('open');
        lbimg.src = '';
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && lb.classList.contains('open')){
        lb.classList.remove('open'); lbimg.src = '';
      }
    });
  }
})();
