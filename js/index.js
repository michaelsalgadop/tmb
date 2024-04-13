// Datos para las APIs
const tmbApi = "https://api.tmb.cat/v1/transit/parades";
const appId = "01bbdcb5"; // Mete aquí el app_id de TMB
const appKey = "c55005f476ab9dd388e08a4951a56140"; // Mete aquí el app_key de TMB

document.querySelector("#btnParada").addEventListener("click", (e) => {
  e.preventDefault();
  const paradaABuscar = document.querySelector("#parada").value;
  limpiarConsola();
  buscarParada(paradaABuscar);
});

const buscarParada = (paradaABuscar) => {
  try {
    let datosParadas;
    fetch(`${tmbApi}/${paradaABuscar}?app_id=${appId}&app_key=${appKey}`)
      .then((response) => response.json())
      .then((response) => {
        const { features: paradas } = response;
        if (paradas.length === 0) {
          datosParadas = null;
        } else {
          datosParadas = paradas.map((parada) => {
            const { properties: propiedadesParada } = parada;
            return {
              numeroParada: propiedadesParada.CODI_PARADA,
              nombreParada: propiedadesParada.NOM_PARADA,
              direccionParada: propiedadesParada.ADRECA,
              nombrePoblacion: propiedadesParada.NOM_POBLACIO,
            };
          });
        }
        mostrarDatos(datosParadas);
      });
  } catch (e) {
    mostrarDatos(null);
  }
};

const limpiarConsola = () => {
  document.querySelector("#recorridoParada").textContent = "";
};

const mostrarDatos = (datos) => {
  if (datos !== null) {
    for (const dato of datos) {
      document.querySelector("#recorridoParada").innerHTML +=
        `<p><span class='negrita'>Número de parada:</span> ${dato.numeroParada}</p>` +
        `<p><span class='negrita'>Nombre de la parada:</span> ${dato.nombreParada}</p><p><span class='negrita'>${dato.direccionParada}, ${dato.nombrePoblacion}</span></p>`;
    }
  } else {
    document.querySelector("#recorridoParada").textContent =
      "No se ha podido imprimir ninguna parada";
  }
};
