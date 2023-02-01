let produits;
// if there is something already in the local storage
if (localStorage.getItem("prods")) {
  produits = JSON.parse(localStorage.getItem("prods"));
} else {
  // first load (no data)
  produits = [];
}
console.log("at start => ", produits);
// when button clicked
go.addEventListener("click", function () {
  // init state (no pdt in store)
  if (produits.length == 0) {
    // make it a json
    newpdt = inputsToJson();
    // push to main array
    produits.push(newpdt);
    // display to verify
    console.log(produits);
    // store to localstorage
    localStorage.setItem("prods", JSON.stringify(produits));
  }
  // already prods in store, just check if new prod already exists
  else {
    let counted = 0; // serving as a flag to know if end reached
    // loop through products
    for (i = 0; i < produits.length; i++) {
      console.log("\nstart the product loop ... ");
      console.log("current prod : ", produits[i]);
      // if name and ref already exists, add the stock
      if (
        produits[i]["nom"] == document.getElementById("nom").value &&
        produits[i]["ref"] == document.getElementById("ref").value
      ) {
        console.log("already in store !");
        produits[i]["stock"] += parseInt(
          document.getElementById("stock").value
        );
        localStorage.setItem("prods", JSON.stringify(produits));
      }
      // not existing, proceed as normal
      else {
        // not this one but maybe the next ?
        counted++;
      }
    } // end of for loop
    console.log(counted);
    // loop ended, check the "counted" flag (end reached without finding occurence of product)
    if (counted === produits.length) {
      console.log("adding new product to list ...");
      newpdt = inputsToJson();
      produits.push(newpdt);
      // display to verify
      console.log(produits);
      // store to localstorage
      localStorage.setItem("prods", JSON.stringify(produits));
    } // end of if
  } // end of else
}); // end of fct
function inputsToJson() {
  // get all inputs
  let nom = document.getElementById("nom").value;
  let ref = document.getElementById("ref").value;
  let prix = parseInt(document.getElementById("prix").value);
  let stock = parseInt(document.getElementById("stock").value);
  // return a pdt as json
  return (pdt_json = {
    nom: nom,
    ref: ref,
    prix: prix,
    stock: stock,
  });
}
