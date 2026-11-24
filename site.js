(function(){
// ============================================================
// FREE TOOLS LIST (Add new tools here in the future!)
// ============================================================
var FREE_TOOLS = [
  { name: 'Google Review QR Code Generator', url: '/free-tools/google-review-qr-code-generator/' }
];

// Inject "Free Tools" dropdown into Header & section into Footer on every page
(function(){
  if(!FREE_TOOLS.length) return;

  // 1. Header Dropdown (matches .dd and .ddm classes in style.css)
  var nav = document.querySelector('header.hdr nav.nav');
  if(nav && !nav.querySelector('.free-tools-dd')){
    var dd = document.createElement('div');
    dd.className = 'dd free-tools-dd';
    var topLink = document.createElement('a');
    topLink.href = FREE_TOOLS[0].url;
    topLink.innerHTML = 'Free Tools &#9662;';
    var menu = document.createElement('div');
    menu.className = 'ddm';
    FREE_TOOLS.forEach(function(t){
      var a = document.createElement('a');
      a.href = t.url;
      a.textContent = t.name;
      menu.appendChild(a);
    });
    dd.appendChild(topLink);
    dd.appendChild(menu);

    // Insert right before "Insights" or "Contact"
    var refLink = nav.querySelector('a[href="/blog"]') || nav.querySelector('a[href="/contact/"]');
    if(refLink){
      nav.insertBefore(dd, refLink);
    } else {
      nav.appendChild(dd);
    }
  }

  // 2. Footer Section (adds "Free Tools" under the Company column)
  var ftrGrid = document.querySelector('footer.ftr .fg');
  if(ftrGrid && !ftrGrid.querySelector('.free-tools-ftr')){
    var cols = ftrGrid.children;
    var targetCol = cols.length >= 3 ? cols[2] : cols[cols.length - 1];
    if(targetCol){
      var h4 = document.createElement('h4');
      h4.className = 'free-tools-ftr';
      h4.style.marginTop = '18px';
      h4.textContent = 'Free Tools';
      targetCol.appendChild(h4);
      FREE_TOOLS.forEach(function(t){
        var a = document.createElement('a');
        a.href = t.url;
        a.textContent = t.name;
        targetCol.appendChild(a);
      });
    }
  }
})();

// WhatsApp popup
try{if(!sessionStorage.getItem('wapop')){setTimeout(function(){var p=document.getElementById('wapop');if(p)p.hidden=false;},4000);}}catch(e){}
// Web3Forms AJAX (same endpoint and access key as the original site)
document.querySelectorAll('.eform').forEach(function(f){
  f.addEventListener('submit',async function(ev){
    ev.preventDefault();
    var m=f.querySelector('.fmsg'),b=f.querySelector('button'),d=new FormData(f);
    var ok=d.get('name')&&d.get('message')&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.get('email')||'');
    if(!ok){m.textContent='Please fill in all required fields with a valid email.';m.style.color='#c0392b';return;}
    b.disabled=true;b.textContent='Sending...';
    try{
      var r=await fetch(f.action,{method:'POST',body:d,headers:{Accept:'application/json'}}),j=await r.json();
      if(r.ok&&j.success){f.reset();m.textContent='Thanks! Your enquiry has been received.';m.style.color='#1a8a4a';}else throw 0;
    }catch(x){m.innerHTML='Something went wrong. Please email <a href="mailto:contact@indiandigitals.com">contact@indiandigitals.com</a>.';m.style.color='#c0392b';}
    b.disabled=false;b.textContent='Send Enquiry';
  });
});
// Recent blog posts on homepage (reads the feed of the blog served at /blog)
var box=document.getElementById('blogs');
if(box){
  var feeds=['/blog/rss/','/blog/rss.xml','/blog/feed/','/blog/sitemap-posts.xml'];
  (async function(){
    for(var i=0;i<feeds.length;i++){
      try{
        var r=await fetch(feeds[i]);if(!r.ok)continue;
        var x=new DOMParser().parseFromString(await r.text(),'text/xml'),it=[].slice.call(x.querySelectorAll('item,entry')).slice(0,3);
        if(!it.length)continue;
        box.innerHTML='';
        it.forEach(function(n){
          var t=(n.querySelector('title')||{}).textContent||'',l=(n.querySelector('link')||{}).textContent||(n.querySelector('link')||{getAttribute:function(){return''}}).getAttribute('href'),
          ds=((n.querySelector('description,summary')||{}).textContent||'').replace(/<[^>]+>/g,'').slice(0,130);
          var a=document.createElement('a');a.className='card';a.href=l.replace(/^https?:\/\/[^/]+/,'');
          a.innerHTML='<h3></h3><p></p><span>Read article &rarr;</span>';a.querySelector('h3').textContent=t;a.querySelector('p').textContent=ds+(ds?'...':'');box.appendChild(a);
        });
        return;
      }catch(e){}
    }
  })();
}
})();
