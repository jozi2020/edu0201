// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://crushdrummers.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать шоу барабанщиков","Барабанное шоу в Москве"]
}
let site = Object.keys(sites)[Math.floor(Math.random()*Object.keys(sites).length)];
let keywords = sites[site];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let googleInput = document.getElementsByName('q')[0];
let btnK = document.getElementsByName('btnK')[1]; //Кнопка посик в google
let links = document.links;
if(btnK!=undefined){ // Главная страница поисковика
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        googleInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },250);
}else if(location.hostname == "www.google.com"){ // Страница выдачи поисковых результатов
    site = getCookie("site");
    let nextGooglePage = true;
    let currentGooglePage = document.getElementsByClassName('YyVfkd')[0].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site)!=-1){
            nextGooglePage = false;
            link.click(); // Кликаем по ссылке
            break; // Прерываем цикл
        }
    }
    if(nextGooglePage && currentGooglePage<11) setTimeout(()=>{document.getElementById("pnnext").click()},1500);
    else if(currentGooglePage == 11) location.href = "https://www.google.com/";
}else{ // Мы находимся на найденом сайте
    setInterval(()=>{
        if(Math.random()>=0.8) location.href = "https://www.google.com/";
        let link = links[Math.floor(Math.random()*links.length)];
        if(link.href.indexOf(location.hostname)!=-1){
           link.click();}
        },3000);
}
