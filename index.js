
import qr from 'qr-image' ;
import inquirer from 'inquirer';
import fs from 'fs' ;

//Create a text 

function createTxt(text,filenme){


    // Write data to 'output.txt' file
    fs.writeFile(filenme, text, (err) => {
        if (err) {
            console.error('Error en creación de fichero:', err);
        } else {
            console.log('Fichero creado con éxito!');
        }
    });
    }


//Create qr image and the txt given its filenames and url
function createQR (url,urlName,text,filenme)        {


    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(urlName));

    createTxt(text,filenme)


    }


//createQR("www.google.com","qr.png","www.google.com","google.txt")


//Ask the user to introduce the url for which we will create the png and txt file


inquirer
  .prompt([
    {
        message :'Inroduce su URL ...',
        name : "url"
    }
  ])
  .then((answers) => {
    createQR(answers.url,"qr.png",answers.url,"qr.txt")
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });