let produits = [];
let panier = [];

//si y'a un localStorage prods alors on le parse
if (localStorage.getItem("prods")) {
  produits = JSON.parse(localStorage.getItem("prods"));
} else {
  // first load (no data)
  produits = [];
}

// if (localStorage.getItem("panier")) {
//   panier = JSON.parse(localStorage.getItem("panier"));
// } else {
//   // first load (no data)
//   panier = [];
// }
//console.log("at start => ", produits);
// when button clicked

createTable();
createAffichage();

btn.addEventListener("click", function () {
  // init state (no pdt in store)
  if (produits.length == 0) {
    // make it a json
    newpdt = inputsToJson();
    // push to main array
    produits.push(newpdt);
    // display to verify
    //console.log(produits);
    // store to localstorage
    localStorage.setItem("prods", JSON.stringify(produits));
  }
  // already prods in store, just check if new prod already exists
  else {
    let counted = 0; // serving as a flag to know if end reached
    // loop through products
    for (i = 0; i < produits.length; i++) {
      //console.log("\nstart the product loop ... ");
      //console.log("current prod : ", produits[i]);
      // if name and ref already exists, add the stock
      if (
        produits[i]["nom"] == document.getElementById("nom").value &&
        produits[i]["ref"] == document.getElementById("ref").value
      ) {
        //console.log("already in store !");
        produits[i]["quantity"] += parseInt(
          document.getElementById("quantity").value
        );
        localStorage.setItem("prods", JSON.stringify(produits));
      }
      // not existing, proceed as normal
      else {
        // not this one but maybe the next ?
        counted++;
      }
    } // end of for loop
    //console.log(counted);
    // loop ended, check the "counted" flag (end reached without finding occurence of product)
    if (counted === produits.length) {
      //console.log("adding new product to list ...");
      newpdt = inputsToJson();
      produits.push(newpdt);
      // display to verify
      //console.log(produits);
      // store to localstorage
      localStorage.setItem("prods", JSON.stringify(produits));
    } // end of if
  } // end of else
  createTable();
}); // end of fct

function inputsToJson() {
  // get all inputs
  let nom = document.getElementById("nom").value;
  let ref = document.getElementById("ref").value;
  let prix = parseInt(document.getElementById("prix").value);
  let quantity = parseInt(document.getElementById("quantity").value);
  // return a pdt as json
  return (pdt_json = {
    "nom": nom,
    "ref": ref,
    "prix": prix,
    "quantity": quantity,
    "ordered" : 0
  });
}

function createTable() {
  let tab = document.getElementById("tableContainer");
  let codeTable = `<table border="1" id="table">
        <tr style="background:black;color:white;">
            <th>Nom</th>
            <th>Référence</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Commandez</th>
        </tr>`;
  for (i = 0; i < produits.length; i++) {
    //console.log(produits[i]);
    codeTable += '<tr style="background:red;color:white;">';
    codeTable += "<td>" + produits[i]["nom"] + "</td>";
    codeTable += "<td>" + produits[i]["ref"] + "</td>";
    codeTable += "<td>" + produits[i]["prix"] + "</td>";
    codeTable += "<td>" + produits[i]["quantity"] + "</td>";
    codeTable += `<td><input type="button" value="ajouter" class="btnSelect" id="${produits[i]["ref"]}"></td>`;
    codeTable += "</tr>";
  }
  codeTable += "</table>";
  tab.innerHTML = codeTable;

  let a = document.getElementsByClassName("btnSelect");

  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("click", function () 
    {
      let pdRef = this.id;

      for (j = 0; j < produits.length; j++) 
      {
        if (produits[j].ref == pdRef) 
        {
          panier.push(produits[j]);     
        
          if(produits[j].quantity > 0)
          {
            produits[j].quantity--;
            produits[j].ordered ++;
            localStorage.setItem("prods", JSON.stringify(produits));
            createTable();            
            createAffichage(); 
          }else 
          {
            produits[j].quantity = 10;
            localStorage.setItem("prods", JSON.stringify(produits));
            createTable();
          }
              
        }
      
      }
    });
  }
}




function createAffichage() {
  
  let affiche = document.getElementById("affiche");
  let codeAffiche = `<ul>`;
  
  for (i = 0; i < produits.length; i++) {
   
   let c = produits[i].quantity;
   c ++;

    codeAffiche +=
      `<li> Article ${produits[i]["nom"]} à 
      ${produits[i]["prix"]} euros et au nombre de 
      ${produits[i]["ordered"]}
      <input type="button" value="supprimer" class="btnSuppr" id="${produits[i]["nom"]}">
      </li>`;
    
  }

  codeAffiche += "</ul>";
  affiche.innerHTML = codeAffiche;

let suppr = document.getElementsByClassName("btnSuppr");

for (i = 0; i < suppr.length; i++) {
  
  suppr[i].addEventListener("click", function() 
  { 
    this.parentNode.parentNode.removeChild(this.parentNode);   
   
  })

}


}





// btn.addEventListener("click", () => {
//   let nom = document.getElementById("nom").value;
//   let ref = document.getElementById("ref").value;
//   let prix = document.getElementById("prix").value;
//   let quantity = parseInt(document.getElementById("quantity").value);

//   if (produits.length == 0) {
//     let myjson = { "nom": nom, "ref": ref, "prix": prix, "quantity": quantity };
//     produits.push(myjson);
//   } else {
//     for (let i = 0; i < produits.length; i++) {

//       if (produits[i]["nom"] == nom && produits[i]["ref"] == ref) {
//         produits[i]["quantity"] += quantity;
//       } else {
//         let myjson = { "nom": nom, "ref": ref, "prix": prix, "quantity": quantity };
//         produits.push(myjson);

//       }
//     }
//     console.log(produits);
//   }

//   localStorage.setItem("produits", JSON.stringify(produits));

// });
