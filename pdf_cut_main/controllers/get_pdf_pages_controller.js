const RUTA_FOLDER = "../uploads/";

const glob = require("glob");

const fs = require("fs");
const { promises: Fs } = require("fs");
const path = require('path');
// Para crear pdf (editar)
const PDFMerger = require('pdf-merger-js');
// Para convertir de epub a pdf 
const ebookConverter = require('node-ebook-converter');

//###############################################################
// Obtener fecha actual de log
const getFecha = () => {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();

    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    
    return dateTime;
}


//###############################################################
// PASO 1: Buscar en el directorio el nomre de archivo especifico
const buscarArchivo2 = function (src, callback) {
    glob(src + '/**/*', callback);
};


//###############################################################
// PASO 2: Recortar paginas de un pdf
async function crearPDFconSoloPaginas(archivo, cantidad_paginas){
    const merger = new PDFMerger();
    
    let nombre_archivo = archivo.split('.');
    let extension = nombre_archivo.pop();
    
    
    // PASO ADICIONAL 2.5, conversion de epub a pdf
    // Verifica si es pdf, de lo contrario lo convierte para procesarlo
    if(extension == 'epub'){
        console.log("Es epub")
        const options = {
            input: archivo, //path to epub
            output: nombre_archivo.join('.')+".pdf", //path to pdf
            authors: "GDC Images from pdf"
        };
        await ebookConverter.convert(options).then(()=>{console.log("Si se pudo convertir a pdf")}).catch((err)=>console.log(err));
    }
    console.log("Acabo la conversion de epub a pdf")
    
    let old_directory_file = nombre_archivo.join('.')+"_cutted.pdf";

    // Nombre final a donde se movera el archivo
    let nombre_archivo_solo = old_directory_file.split('/').pop();
    let move_to = `uploads/${nombre_archivo_solo}`;

    // String para tener cuidado de los filtros que se indican
    await merger.add(nombre_archivo.join('.')+".pdf", String(cantidad_paginas)); 
    await merger.save(old_directory_file);
    
    await fs.rename(old_directory_file, move_to, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Se movio el archivo a la ruta esperada!");
        }
    });

    // Borra en caso de que sea epub transformado
    if(extension == 'epub'){
        fs.unlink(nombre_archivo.join('.')+".pdf", (err => {
            if (err) console.log("Archivo NO SE PUDO BORRAR", err);
            else console.log("Archivo pdf de epub borrado");                        
        }));
    }

    
    fs.appendFile('logs/log.txt', getFecha()+' - Archivo: '+move_to+", procesado correctamente.\n", function (err) {
        if (err) console.log("Error en crear el log de registro");
        console.log('Log registrado con éxito');
    });

    // Ruta del archivo nuevo
    return move_to;
}

//###############################################################
module.exports.get_pdf_pages_controller = async (req, res, next) => {

    var extension_valida = req.params.name_pdf.split('.').pop();
    
    if(extension_valida != 'pdf' && extension_valida != 'epub'){
        console.log("No es valida") 
        return res.status(400).json({
            status: 400,
            message: "Bad request",
            data: "Debes proporcionar un nombre de archivo con extension valida, pdf o epubs"
        });
    }

    buscarArchivo2(RUTA_FOLDER, async (err, respuesta) => {
        if (err) {
          console.log('Error', err);
        } else {
            let archivo = respuesta.filter((archivo) => archivo.indexOf(req.params.name_pdf) != -1);

            if(archivo.length != 0){
                
                let ruta_file_recortado = await crearPDFconSoloPaginas(archivo[0], req.params.range);
                
                return res.status(200).download(ruta_file_recortado);                
            }else{
                res.json({
                    status: 404,
                    data: [],
                    message: "No se encontro el archivo"
                });

            }
        }
    });
}