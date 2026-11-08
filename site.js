(function(){
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
