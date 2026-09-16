(function(){
  'use strict';
  var header=document.getElementById('header');
  var toggle=document.getElementById('menu-toggle');
  var nav=document.getElementById('nav');
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setMenu(open){
    if(!toggle||!nav)return;
    nav.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  }
  if(toggle&&nav){
    toggle.addEventListener('click',function(){setMenu(toggle.getAttribute('aria-expanded')!=='true')});
    nav.addEventListener('click',function(event){if(event.target.tagName==='A')setMenu(false)});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'){setMenu(false);toggle.focus()}});
  }

  function onScroll(){if(header)header.classList.toggle('is-stuck',window.scrollY>20)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var items=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){
    items.forEach(function(item){item.classList.add('is-in')});
  }else{
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-in');observer.unobserve(entry.target)}});
    },{rootMargin:'0px 0px -6% 0px',threshold:.06});
    items.forEach(function(item,index){item.style.transitionDelay=(index%3)*70+'ms';observer.observe(item)});
  }

  document.querySelectorAll('.accordion details').forEach(function(item){
    item.addEventListener('toggle',function(){
      if(!item.open)return;
      document.querySelectorAll('.accordion details').forEach(function(other){if(other!==item)other.open=false});
    });
  });
  var year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
})();
