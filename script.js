window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    document.querySelector(".filterknap_vegetar").addEventListener("click", filtrerVegetar);



}

function filtrerVegetar (event) {
    console.log("Klik på vegetar-filter");
    // find alle ikke vegetar produkter
    var liste = document.querySelectorAll(".produkt:not(.vegetar)");
    // skjul dem - tilføj klassen "hide"
    liste.forEach( produkt => produkt.classList.toggle("hide"));
    event.preventDefault();
}



function visProduktListe ( listen ) {
    console.log(listen);

    // filtrer udsolgte produkter fra...
    // For hvert produkt sender den produktet ind i beregningen og returnerer
    listen = listen.filter ( produkt => !produkt.udsolgt );

    listen.forEach(visProdukt);
}


function visProdukt (produkt) {
    console.log(produkt);
    //Vis produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    if ( produkt.vegetar ){
        klon.querySelector(".produkt").classList.add("vegetar");
    }

    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_kortbeskrivelse").innerHTML = produkt.kortbeskrivelse;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil( produkt.pris - (produkt.pris*produkt.rabatsats/100 ) );
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/images/small/"+produkt.billede+"-sm.jpg";

    if ( produkt.udsolgt == false ) {
        // produktet er ikke udsolgt
        // udsolgttekst skal fjernes

        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild( udsolgttekst );

    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if ( produkt.udsolgt == true || produkt.rabatsats == 0 ) {
        //der er ikke rabat
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    // tilføj produkt-id til modalknap
    klon.querySelector(".modalknap").dataset.produkt = produkt.id;

    // registrer klik på modalknap
    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik);

    // append klon til .produkt_liste
    //document.querySelector(".produktliste").appendChild(klon);

    // hvis kategori var forret, append til forretliste
    if (produkt.kategori == "forretter") {
        document.querySelector(".forretliste").appendChild(klon);
    } else if (produkt.kategori == "hovedretter"){
        // hvis kategori var forret, append til hovedretliste
        document.querySelector(".hovedretliste").appendChild(klon);
    } else if (produkt.kategori == "dessert"){
        document.querySelector(".dessertlsite").appendChild(klon);
    }
    // hvis kategori var hovedret, append til hovedretliste


}


function modalKnapKlik (event) {
    console.log("knapklik", event);

    // find det produkt id, hvis knap derr blev trykket på
    var produktId = event.target.dataset.produkt;
    console.log("klik på produkt: " , produktId);

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {id: produktId}, visModalProdukt);
}

function visModalProdukt(produkt) {

    /*var rabatpris = Math.ceil( produkt.pris - (produkt.pris*produkt.rabatsats/100 ) );
    klon.querySelector(".data_rabatpris").innerHTML = produkt.rabatpris;*/

    console.log("vis modal for ", produkt);

    // find modal_template - klon den
    var klon = document.querySelector("#modal_template").content.cloneNode(true);

    // put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;


    // PRIS
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    // RABATPRIS



    // BILLEDE
    klon.querySelector(".data_billede").src = "/images/medium/"+produkt.billede+"-md.jpg";

    // LANG BESKRIVELSE
    klon.querySelector(".data_langbeskrivelse").innerHTML = produkt.langbeskrivelse;

    // PRIS
    // sletter det der stod i modal-content
    document.querySelector(".modal-content").innerHTML = "";

    //appen klonen til modal-content
    document.querySelector(".modal-content").appendChild(klon);

}
