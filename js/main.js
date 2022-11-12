/*
 * Salina Gonzalo
 * - Según lo comentado en clase utilizare la función onclick -
 */

// Variables globales
let password;
/*
 * Balance de cuenta inicial
 * Default: $0
 */
let moneyAtAccount = 0;
/**
 * Almacena los movimientos del usuario
 */
let accountMovements = [];

// Mientras devuelva verdadero va a funcionar el búcle
while (true) {
  let newUsername = prompt("Ingrese un usuario");
  password = prompt("Ingrese una contraseña de 8 o más digitos");
  let userAccessLevel = prompt("Ingrese un nivel de acceso (0: ADMIN,1: USER)");

  // Valida que el usuario y contraseña no este en blanco
  if (newUsername.trim() === "" || password.trim() === "") {
    aler("El usuario, contraseña o el nivel de acceso no puede estar vacia");
    continue;
    // Valida que la contraseña no sea menor de 8 digitos
  } else if (password.trim().length < 8) {
    alert("La contraseña no puede ser menor a 8 digitos");
    continue;
  } else {
    /*
     * Valida si no se ingreso ningún nivel de acceso
     * DEFAULT = 1 (user)
     */
    if (!userAccessLevel.trim()) {
      userAccessLevel = 1;
    }
    console.log(`Usuario generado con exito`);
    showData(newUsername, userAccessLevel, password);
    break;
  }
}
/*
 *
 * Función principal para mostrar contenido
 *
 */

function showData(username, accesslevel) {
  document.write(`<div class="navBar">
  <h1 class="logo">CODERENTREGABLE</h1>
  </div>
  <div class="loginMessage"><div class="loginCongratz">Hola <a>${username}</a></div></div>`);
  showContentForAccessLevel(accesslevel);
}

/*
 *
 * Dependiendo el nivel de acceso muestra o no datos
 *
 */

function showContentForAccessLevel(accesslevel) {
  let level = parseInt(accesslevel);
  let getResult;

  switch (level) {
    case 0:
      getResult = document.write(
        `
        <div class="container">
        <div class="accessContent"><a class="accessLevel">Tu nivel de acceso es de admininistrador</a></div>
        <button class="changePasswordBtn" onclick="changePassword()">Cambiar contraseña actual</button>
        <div>
        <button class="cashBtn" onclick="insertCash()">Ingresar dinero</button>
        <button class="cashBtn" onclick="showAccountCash()">Ver dinero en cuenta</button>
        <button class="cashBtn" onclick="displayMovements()">Ver movimientos</button>
        <button class="cashBtn" onclick="searchTransaction()">Buscar transaccion</button>
        </div>
        </div>`
      );
      break;
    case 1:
      getResult = document.write(
        `
        <div class="container">
        <div class="accessContent"><a class="accessLevel">Tu nivel de acceso es de usuario</a></div>
        <div>
        <button class="cashBtn" onclick="insertCash()">Ingresar dinero</button>
        <button class="cashBtn" onclick="showAccountCash()">Ver dinero en cuenta</button>
        <button class="cashBtn" onclick="displayMovements()">Ver movimientos</button>
        <button class="cashBtn" onclick="searchTransaction()">Buscar transaccion</button>
        </div>
        </div>`
      );
      break;
    default:
      break;
  }
  return getResult;
}

const changePassword = () => {
  // Valida las veces que se solicito el código
  let securityCodeProtect = 0;

  while (true) {
    let newPassword;
    let securityCode = Math.floor(Math.random() * 9999).toString();

    /*
     * Prevenimos que el envío del código de seguridad se envie
     * nuevamente en caso que la contraseña no coincida
     */
    if (securityCodeProtect === 0) {
      console.info(`Codigo de seguridad: ${securityCode}`);
      let writeSecurityCode = prompt(
        "Escribe el codigo de seguridad enviado por consola"
      );
      if (writeSecurityCode !== securityCode) {
        alert("El código ingresado no es correcto");
        break;
      } else {
        securityCodeProtect++;
      }
    }

    let writeOldPassword = prompt("Escribe tu contraseña actual");
    if (writeOldPassword.trim() === password) {
      newPassword = prompt("Escribe tu nueva contraseña");
      if (newPassword.trim() === "" || newPassword.trim().length < 8) {
        alert(
          "Tu contraseña no puede estar en blanco o ser menor a 8 digitos."
        );
        continue;
      }
    } else {
      alert("La contraseña ingresada no coincide.");
      continue;
    }
    password = newPassword;
    alert("Contraseña cambiada correctamente");
    // Vuelve a setear la variable en su valor DEFAULT para poder volver a cambiar la contraseña
    securityCodeProtect = 0;
    break;
  }
};

/*
 * Ingresa dinero a la cuenta, teniendo de default el valor 0
 */
const insertCash = () => {
  while (true) {
    let movements = { id: 0, nombre: "", ammount: 0, time: "" };
    let time = new Date();
    let transactionNumber = Math.floor(Math.random() * 9999).toString();

    let cashInput = prompt("Ingrese la cantidad de dinero que quiere ingresar");

    // Pasa el valor obtenido a float y lo valida
    if (parseFloat(cashInput) <= 5 || cashInput.trim() === "") {
      alert("El valor a ingresar no puede ser menor a $5 pesos");
      continue;
    }
    // Le suma al balance actual el dinero ingresado
    moneyAtAccount = parseFloat(cashInput) + parseFloat(moneyAtAccount);
    movements.id = transactionNumber;
    movements.nombre = "Ingreso de dinero";
    movements.ammount = cashInput;
    movements.time = time.toLocaleString();
    accountMovements.push(movements);
    alert(
      `El dinero se ha ingresado con exito, el número de transaccion es ${transactionNumber}`
    );
    break;
  }
};
/*
 * Muestra el balance de la cuenta
 */
const showAccountCash = () => {
  alert(`Balance de cuenta: $${moneyAtAccount}`);
};
/**
 * Muestra los movimientos de la cuenta
 */
const displayMovements = () => {
  accountMovements.forEach((movement) => {
    return alert(
      `Numero de transaccion: ${movement.id}\nNombre: ${movement.nombre}\nMonto: $${movement.ammount}\nDia y horario: ${movement.time}`
    );
  });
};
/**
 * Busca las transacciones mediante el ID asignado a cada una
 */
const searchTransaction = () => {
  let searchInput = prompt("Ingrese el numero de transaccion");
  if (searchInput.trim() === "") {
    alert("El contenido no puede estar vacío y debe ser un numero");
  }
  let getTransaction = accountMovements.filter(
    (transaction) => transaction.id === searchInput
  );
  if (getTransaction.length > 0) {
    getTransaction.forEach((result) => {
      alert(
        `Numero de transaccion: ${result.id}\nNombre: ${result.nombre}\nMonto: $${result.ammount}\nDia y horario: ${result.time}`
      );
    });
  } else {
    alert(`No se han encontrado coincidencias`);
  }
};
