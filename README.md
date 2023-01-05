<h1>PDF & EPUB pages extractor</h1>
<i>Proyecto para la extracción de paginas de un PDF o EPUB,
 mismo que devolvera un PDF transformado con la cantidad de páginas
 indicadas por parametro</i>
<h1>Requeriminetos: </h1>
<ul>
    <li>NodeJS, v16.15.1 (version con la que fue creado el proyecto)</li>
    <li>Calibre, binario para conversion de epub a pdf a nivel de sistema, descargar de:
        <ul>
            <li>https://calibre-ebook.com/</li>
        </ul> 
    </li>
</ul>

<h2>Instalar requerimientos: </h2>
<ul>
    <li>npm install</li>
    <li>npm start (modificar el package.json, por defecto se emplea nodemon)</li>
</ul>

<h1>Como usar:</h1>
<p>La estructura es la siguiente:</p>
<i>http://localhost:3000/api/upload_name/:range/:name_pdf</i>
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
    <li>http://localhost:3000/api/upload_name/1/mi_pdf.pdf</li>
    <li>http://localhost:3000/api/upload_name/1,2,3,4/mi_pdf.pdf</li>
</ul>