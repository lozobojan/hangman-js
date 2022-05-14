// niz objekata koji predstavljaju oblast i ponudjene rijeci
const pitanja = [
  {
    oblast: "Pogodite grad u Crnoj Gori",
    ponudjeno: [
      "podgorica",
      "budva",
      "bar",
      "kolašin",
      "danilovgrad",
      "tivat",
      "kotor"
    ]
  },
  {
    oblast: "Pogodite programski jezik",
    ponudjeno:[
      "javascript",
      "php",
      "python",
      "cpp",
      "csharp",
      "kotlin"
    ]
  }
];
let abeceda = ['a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj','m','n','nj','o','p','r','s','š','t','u','v','z','ž'];

var trazenaRijec;
var pokusanaSlova = [];
var trenutnaRijec = "";
var dozvoljenoPokusaja = 6;
var brojacPokusaja = 0;

function pocniIgru(){
  let nasumicnaOblast = nasumicniElement(pitanja);
  trazenaRijec = nasumicniElement(nasumicnaOblast.ponudjeno);

  zadajRijec(nasumicnaOblast.oblast);
}

function zadajRijec(oblast){
  document.getElementById("oblast").innerHTML = oblast;
  trenutnaRijec = "_".repeat(trazenaRijec.length);
  document.getElementById("trazenaRijec").innerHTML = trenutnaRijec;
}

function nasumicniElement(niz){
  return niz[ Math.floor( Math.random() * niz.length ) ];
}

function prikaziTastaturu(){
  let dugmad = [];
  abeceda.forEach( (slovo) => {
    dugmad.push(`<button class="btn btn-primary p-3 m-1" id="dugme_${slovo}" onclick="odaberiSlovo('${slovo}')" >${slovo.toUpperCase()}</button>`);
  });
  document.getElementById("tastatura").innerHTML = dugmad.join('');
}

function odaberiSlovo(slovo){

  pokusanaSlova.push(slovo);
  document.getElementById("dugme_"+slovo).disabled = true;

  if(trazenaRijec.includes(slovo)){
    uvrstiSlovo(slovo);
    provjeriPobjedu();
  }else{
    brojacPokusaja++;
    azurirajSliku();
    provjeriPoraz();
  }
}

function uvrstiSlovo(odabranoSlovo){
  let trazenaRijecNiz = trazenaRijec.split('');
  let trenutnaRijecNiz = trenutnaRijec.split('');

  trazenaRijecNiz.forEach((slovo, index) => {
    if(odabranoSlovo == slovo){
      trenutnaRijecNiz[index] = odabranoSlovo;
    }
  });
  trenutnaRijec = trenutnaRijecNiz.join('');
  document.getElementById("trazenaRijec").innerHTML = trenutnaRijec;
}

function provjeriPobjedu(){
  if(trenutnaRijec == trazenaRijec){
    document.getElementById("poruka").innerHTML = "<div class='alert alert-success text-center' >Čestitamo! Pronašli ste traženu riječ!</div>";
    zabraniDugmad();
  }
}

function provjeriPoraz(){
  if(dozvoljenoPokusaja == brojacPokusaja){
    document.getElementById("poruka").innerHTML = "<div class='alert alert-danger text-center' >Tražena riječ je: "+trazenaRijec+"</div>";
    let dugmePokusajPonovo = "<button id='pokusajPonovo' class='btn btn-warning btn-block' onclick='pokusajPonovo()' >Pokušaj ponovo</button>";
    document.getElementById("pokusajPonovo").innerHTML = dugmePokusajPonovo;
    zabraniDugmad();
  }
}

function azurirajSliku(){
  document.getElementById("slika").src = "./img/"+brojacPokusaja+".png";
}

function pokusajPonovo(){
  location.reload();
}

function zabraniDugmad(){
  document.querySelectorAll("button:not(#pokusajPonovo)").forEach( (dugme) => { dugme.disabled = true; } );
}

pocniIgru();
prikaziTastaturu();