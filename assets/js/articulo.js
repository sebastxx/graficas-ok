// Clave de API de Google Sheets
const apiKey = 'AIzaSyANrS0qZH2YhAZtpaVIAE4jxVrIPhhZdjo';

// ID de la hoja de cálculo y nombre de la hoja
const spreadsheetId = '1ZmpLQNersX_IEKV9qhQjomtun3uv-m-FIqVHKcSJaLQ';
const sheetName = 'Escuelas';

// URL de la API de Google Sheets
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

// Función para transformar un producto
function transformProduct(row) {
    const product = {
        nombre: row[0] || 'Sin nombre',
        precio: row[2] || 'Precio no disponible',
        descripcion: row[4] || 'Descripción no disponible',
        imagenes: [row[5], row[6], row[7], row[8], row[9]].filter(Boolean)
    };
    return product;
}

// Realiza una solicitud GET a la API de Google Sheets utilizando Fetch
fetch(apiUrl)
    .then(response => response.json())
    .then(dataFromSheet => {
        const products = [];

        // El objeto dataFromSheet ahora tiene una propiedad "values"
        const rows = dataFromSheet.values;

        // Comienza desde la segunda fila para omitir el encabezado
        for (let i = 1; i < rows.length; i++) {
            const productData = rows[i];
            const product = transformProduct(productData);
            products.push(product);
        }

        // Ahora tienes el arreglo de productos en el formato deseado
        console.log(products);

        // Puedes utilizar 'products' en tu aplicación web
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });



// Supongamos que tienes un objeto de producto con los datos del producto actual
const producto = {
    nombre: "Calificadors",
    precio: "$ 999,99",
    descripcion: "Nuestros cuadernos son personalizados a la medida del cliente...",
    imagenes: [
        "./assets/images/comunicado.gif",
        "./assets/images/comunicados/comunicados_tapa (7).jpg",
        "./assets/images/comunicados/comunicados_tapa (10).jpg",
        "./assets/images/comunicados/autorizacion (5).jpg",
        "./assets/images/comunicados/datos (12).jpg"
    ]
};

// Obtén el contenedor donde se agregará el contenido
const contenedor = document.querySelector(".py-5");

// Crea el HTML dinámicamente utilizando template strings
const contenidoHTML = `
    <div class="container">
        <div class="row gx-5">
            <aside class="col-lg-6">
                <div class="border rounded-4 mb-3 d-flex justify-content-center">
                    <a data-fslightbox="mygallery" class="rounded-4 imagenarticulo" target="_blank" data-type="image" href="#">
                        <img id="imagenPrincipal" class="rounded-4 fit" src="${producto.imagenes[0]}" alt="Imagen principal del producto"/>
                    </a>
                </div>
                <div class="d-flex justify-content-center mb-3">
                <!-- Miniaturas de las imágenes -->
                ${producto.imagenes.map(imagen => `
                <a href="javascript:void(0)" class="border mx-1 rounded-2" onclick="cambiarImagen('${imagen}')">
                    <img width="60" height="60" class="rounded-2" src="${imagen}" alt="Imagen principal del producto" />
                </a>
                `).join('')}
                <!-- Fin de miniaturas -->
                </div>
            </aside>
            <main class="col-lg-6">
                <div class="ps-lg-3">
                    <h1 class="title text-dark">
                        ${producto.nombre}
                    </h1>
                    <div class="mb-3">
                        <span class="h3">${producto.precio}</span>
                        <span class="text-muted">&nbsp;Precio Agosto 2023</span>
                    </div>
                    <p>
                        ${producto.descripcion}
                    </p>
                        <i class="bi bi-cart"></i><a href="#" class="btn shadow-0">Comprar Ahora</a>
                    <p>
                        A continuación podrás ver un catálogo con ejemplos reales de productos entregados a nuestros clientes.
                    </p>
                </div>
            </main>
        </div>
    </div>
    `;

// Agrega el contenido generado al contenedor
contenedor.innerHTML = contenidoHTML;
