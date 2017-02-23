window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");
    visProdukt();
}

function visProdukt () {
    //Vis produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    // indsæt data i klon

    // append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
