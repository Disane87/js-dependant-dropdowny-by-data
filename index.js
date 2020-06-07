// DEINE DATEN

const data = {
  countries: ["Germany", "Netherlands"],

  states: {
    Germany: ["NRW", "Hessen"],
    Netherlands: ["Brabant", "Limburg"]
  },

  cities: {
    NRW: ["Viersen", "Mönchengladbach"],
    Hessen: ["Frankfurt", 'Wiesbaden'],
    Brabant: ["Eindhoven", 'Helmond'],
    Limburg: ['Venlo', 'Roermond']
  },

  status: {
    NRW: ["Mag ich"],
    Hessen: ['Drecksland'],
    Brabant: ['Meh?'],
    Limburg: ['urgh']
  }
};

// Element in die die Selectboxen eingefügt werden
const selectboxes = document.getElementById("selectboxes");

// Generiere Box für Countries 
const countryBox = createSelectbox("countries", data, selectboxes);

// Generiere Box für States 
const stateBox = createSelectbox("states", data, selectboxes, countryBox);

// Generiere Box für cities 
const districtBox = createSelectbox("cities", data, selectboxes, stateBox);

// Generiere Box für cities 
const statusBox = createSelectbox("status", data, selectboxes, stateBox);

////////////////// FUNCTIONS

function createSelectbox(name, items, destinationNode, parent) {
  // select element erzeugen
  var selectList = document.createElement("select");

  // Name der selectbox setzen
  selectList.id = name;

  // in den destination node einfügen
  destinationNode.appendChild(selectList);

  // eventlistener hinzufügen, damit auf Veränderungen gehört wird
  selectList.onchange = changeEvent => {

    // aktuellen wert ermitteln
    const targetElementValue = changeEvent.target.value;

    // alle abhängigen Felder holen
    const dependingSlaves = document.querySelectorAll(
      "[data-dependsOn=" + selectList.id + "]"
    );

    // abhängige Felder iterieren und werte ändern
    dependingSlaves.forEach(slave => {
      appendOptions(data[slave.id][targetElementValue], slave, true);
    });
  };

  // options aus den daten exrahieren
  const optionItems = items[name];

  // wenn es einen parent gibt (von dem die box abhängt)
  if (parent != null) {

    // wert des parent ermitteln
    const parentValue = parent.options[parent.selectedIndex].value;

    // optionen anhand des parents ermitteln
    optionItems = items[name][parentValue];

    // attribut "dependson" schreiben, darüber wird später ermittelt, welche Felder von wem anhängen
    selectList.setAttribute("data-dependsOn", parent.id);
  }

  // optionen anfügen
  appendOptions(optionItems, selectList);

  return selectList;
}

function appendOptions(options, element, clear = false) {
  if (clear) {
    removeOptions(element);
  }

  //Create and append the options
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    element.appendChild(option);
  }

  element.selectedIndex = 0;
  element.dispatchEvent(new Event('change'));
}

function removeOptions(selectElement) {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}
