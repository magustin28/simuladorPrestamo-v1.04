mostrarProductos();


const dolar = document.querySelector('#dolar');

async function cotizacionesDolar() {

    const classDolarAgregar = ['text-center', 'fs-5', 'fst-italic'];

    await fetch('https://dolar-api-argentina.vercel.app/v1/dolares/blue')
        .then(async (response) => {
            if (response.ok) {
                dolarBlue = await response.json();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .catch((error) => {
            console.log('Error al obtener los datos de la API:', error);
            classDolarAgregar.forEach(clase => { dolar.classList.add(clase) });
            dolar.innerHTML = `Lo sentimos, no pudimos acceder a las cotizaciones. Por favor, recargue la página o consulte mas tarde.`;
        });
}

function mostrarDolares() {

    const divDolar = document.createElement('div');
    dolar.appendChild(divDolar);

    divDolar.innerHTML = `  <div class="col-2 d-flex justify-content-center me-5 border border-primary-subtle rounded-4">
                                <table>
                                    <tr>
                                        <td colspan="2" class="text-center bg-primary-subtle">Dolar Blue</td>
                                    </tr>
                                    <tr>
                                        <td class="pt-2 px-3 text-center">Compra</td>
                                        <td class="pt-2 px-3 text-center">Venta</td>
                                    </tr>
                                    <tr>
                                        <td class="pt-2 px-3 text-center">$${dolarBlue.compra}</td>
                                        <td class="pt-2 px-3 text-center">$${dolarBlue.venta}</td>
                                    </tr>
                                    <tr>
                                    <td colspan="2" class="text-center fst-italic font pt-2">Actualización el ${formatearFecha(dolarBlue.fechaActualizacion)}</td>
                                    </tr>
                                </table>
                            </div>
    
    `
}

cotizacionesDolar().then(() => mostrarDolares());
  