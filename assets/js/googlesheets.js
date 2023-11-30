function llamarGoogleSheets() {
    var spreadsheetId = '1fXpH7aGx6GWA4fbZmzIJ2snDkjEO1fg0htM872iEqVg';
        var range = 'A2:I99';
    var apiKey = 'AIzaSyC6UvksN7iFu6HetUO0gAt9cgoZPZfNDno';
        var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                var values = data.values[1]; // Tomar la primera fila de datos
                document.querySelector('h1.title.text-dark').innerText = values[0];
                document.querySelector('.h3').innerText =  values[1];
                document.querySelector('.text-muted').innerText = 'Precio ' + values[2];
                document.querySelector('p').innerText = values[3];
                // Asignar las miniaturas de imágenes también
                // ...
            })
            .catch(error => console.error('Error al obtener datos: ', error));
    }

    llamarGoogleSheets();