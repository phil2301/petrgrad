window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    visProdukt();
}

function visProduktListe ( listen ) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt (produkt) {
    console.log(produkt);
    //Vis produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    // indsæt data i klon

    // append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
