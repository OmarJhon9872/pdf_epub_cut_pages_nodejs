const express = require('express');
const app = express();

const get_pdf_pages_ruta = require('./routes/get_pdf_file_route');

app.use('/api', get_pdf_pages_ruta);
app.get('/', function(req, res, next){
    res.status(200).write(`
        <h1>Como usar:</h1>
        <p>La estructura es la siguiente:</p>
        <i>`+req.protocol + '://' + req.get('host')+`/api/upload_name/:range/:name_pdf</i>
        <br><br>
        <b>Donde: </b><br>
        <hr>
        <ul>
            <li>
                :range - Rango de hojas a descargar, los posibles valores son:
                <ul>
                    <li>2 - El numero de pa&#769;gina a descargar</li>
                    <li>1,2,3,4 - El rango de pa&#769;ginas 1, 2, 3 y 4, ojo de no poner espacios entre el rango</li>
                </ul>
            </li>
            <li>:name_pdf - El nombre EXACTO del pdf o epub a buscar y descargar</li>
        </ul>
        <b>Ejemplos de url validos: </b><hr>
        <ul>
            <li>`+req.protocol + '://' + req.get('host')+`/api/upload_name/1/mi_pdf.pdf</li>
            <li>`+req.protocol + '://' + req.get('host')+`/api/upload_name/1,2,3,4/mi_pdf.pdf</li>
        </ul>

    `);
    res.end()
});

app.listen(3000, () => console.log("Servidor iniciado en 3000"));