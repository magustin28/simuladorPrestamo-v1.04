//COTIZACIONES DE DOLARES

//Todos los dolares
async function mostrarCotizacionDolar() {

    const dolar = document.querySelector('#dolar');
    const divDolar = document.createElement('div');
    divDolar.classList.add('row','d-flex','justify-content-center');
    dolar.appendChild(divDolar);

    await fetch('https://dolar-api-argentina.vercel.app/v1/dolares')
        .then(async (response) => {
            if (response.ok) {

                cotizacionDolares = await response.json();

                cotizacionDolares.forEach((producto) => {

                    divDolar.innerHTML += `
                                
                    <div class="col-8 col-md-4 col-lg-3 d-flex justify-content-center m-3 border border-primary-subtle cardDolar">
                        <table>
                            <tr>
                                <td colspan="2" class="text-center bg-primary-subtle">${producto.nombre}</td>
                            </tr>
                            <tr>
                                ${producto.compra && producto.venta ? `<td class="pt-2 px-3 text-center">Compra</td>` : ''}
                                ${producto.compra && producto.venta ? `<td class="pt-2 px-3 text-center">Venta</td>` : ''}
                                ${!producto.compra && producto.venta ? `<td colspan="2" class="pt-2 px-3 text-center">Venta</td>` : ''}
                            </tr>
                            <tr>
                                ${producto.compra && producto.venta ? `<td class="pt-2 px-3 text-center">$${producto.compra}</td>` : ''}
                                ${producto.compra && producto.venta ? `<td class="pt-2 px-3 text-center">$${producto.venta}</td>` : ''}
                                ${!producto.compra && producto.venta ? `<td colspan="2" class="pt-2 px-3 text-center">$${producto.venta}</td>` : ''}
                            </tr>
                            <tr>
                            <td colspan="2" class="text-center fst-italic font pt-2">Actualizado el ${formatearFecha(producto.fechaActualizacion)}</td>
                            </tr>
                        </table>
                    </div>
                    `;
                });
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .catch((error) => {
            console.log('Dolar Blue. Error al obtener los datos de la API: ', error);
        });
}