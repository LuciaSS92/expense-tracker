const newMovementElement = document.querySelector("#newTransaction");
const movementListElement = document.querySelector("#movement-list");

// Crear nuevos movimientos
newMovementElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const concept = document.querySelector("#concept");
  const amount = document.querySelector("#amount");

  let newMovement = {
    newConcept: concept.value,
    newAmount: amount.value,
  };

  // Borra lo que se escribió en cada campo
  concept.value = "";
  amount.value = "";

  showMovements(newMovement);
  showTotals();
});

// Actualizar totales
function showTotals() {
  let elements = document.getElementsByClassName("addedAmounts");
  let myLength = elements.length;

  let total = 0;
  let totalDeposits = 0;
  let totalExpenses = 0;

  for (let i = 0; i < myLength; ++i) {
    let onlyAmount = parseFloat(elements[i].innerHTML.replace("Cantidad: ", ""));
    total += onlyAmount;

    if (onlyAmount > 0) {
      totalDeposits += onlyAmount;
    } else {
      totalExpenses += onlyAmount;
    }
  }

  document.getElementById("total").innerHTML = total;
  document.getElementById("sumDeposits").innerHTML = totalDeposits;
  document.getElementById("sumExpenses").innerHTML = totalExpenses;
}

// Mostrar movimientos en pantalla
function showMovements(movement) {
  const movementElement = document.createElement("article");

  movementElement.setAttribute("id", movement.id);

  let movementContent = `
      <p>Concepto: ${movement.newConcept}</p>
      <p class="addedAmounts">Cantidad: ${movement.newAmount}</p>
      <button onclick="deleteMovement(${movement.id})"> X </button>
          `;

  movementElement.innerHTML = movementContent;
  movementListElement.prepend(movementElement);
}

// Borrar movimientos
function deleteMovement(movementId) {
  const movementElement = document.getElementById(movementId);
  movementElement.remove();
  showTotals()
}
