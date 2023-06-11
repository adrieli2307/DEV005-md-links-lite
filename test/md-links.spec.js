const fs = require('fs');
const {validate} = require ("../src/validate")
const { pathValid } = require('../src/funcionespath');
const {filemd }= require('../src/readDoc');
const {archiDoc} = require ('../src/fileArchiv');
const path = require("path")
const axios = require ("axios")



 /* -------------------------- Test ruta existente ---------------------------*/
 describe('pathValid', () => {
  it('debería devolver true si la ruta existe', () => {
    const existPath = 'C:\\Users\\adri_\\Desktop\\Portafolio JS\\Laboratoria\\DEV005-md-links-lite\\src\\hello-world.md';

    const result = pathValid(existPath);

    expect(result).toBe(existPath);
  });

  it('debería devolver la ruta absoluta si la ruta es relativa y existe', () => {
    const relativePath = 'C:\\Users\\adri_\\Desktop\\Portafolio JS\\Laboratoria\\DEV005-md-links-lite\\src\\hello-world.md';
    const expectedPath = path.resolve(relativePath);

    const result = pathValid(relativePath);

    expect(result).toBe(expectedPath);
  });
});

/* -------------------------- Test de validacion archivo .md ---------------------------*/

describe('filemd', () => {
  test('debería leer el contenido del archivo .md', async () => {
    const filePath = './src/hello-world.md';

    try {
      // Llama a la función filemd con el filePath
      const result = await filemd(filePath);
      expect(result).toBe("El archivo tiene la extensión .md");
    } catch (error) {
      // Si hay un error, falla el test
      console.log();(error);
    }
  });

  test('debería mostrar un mensaje de error para un archivo que no es .md', async () => {
    const filePath = './src/hello.txt';

    try {
      // Llama a la función filemd con el filePath
      await filemd(filePath);
      // Si no hay error, falla el test
      console.log();('Se esperaba un error');
    } catch (error) {
      expect(error).toBe('El archivo no tiene la extensión .md o la ruta es inválida');
    }
  });

});
/* -------------------------- Test de archivo  ---------------------------*/
describe('archiDoc', () => {
  test('debería extraer los links del archivo Markdown', async () => {
    const filePath = './src/hello-world.md';

    const fileContent = `This is a [link](https://example.com) inside a Markdown file`;

    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    const consoleLog = console.log;
    console.log = jest.fn();

    const result =   await archiDoc(filePath);
  
      expect(result).toEqual([
        {
          href: 'https://github.com/krlosh/learnyounode_ejercicios',
          text: 'link',
          file: path.resolve(filePath)
        },
        {
          href: "https://lucid.app/lucidchart/a3d0479b-13d3-4337-82c7-5d69088ed72f/edit?beaconFlowId=C2583C497EEEC5CE&invitationId=inv_be404150-2611-4303-b9bf-dfdda156e7a1&page=0_0#", 
          text: "hola",
          file: path.resolve(filePath)
        },
        {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
        file: path.resolve(filePath)
        },
        {
        href: "https://nodejs.com/api/fs.html#fsfstatsyncfd-optio",
        text: "Video",
        file: path.resolve(filePath)
        }

      ]);
  

    console.log = consoleLog;
  });
});
/* -------------------------- Test de validate ---------------------------*/
describe('validate', () => {
  test('debería validar los links y devolver los resultados', async () => {
    const objLinks = [
      {
        href: 'https://example.com',
        text: 'Link 1',
        file: 'file1.md',
      },
      {
        href: 'https://google.com',
        text: 'Link 2',
        file: 'file2.md',
      },
    ];

    // Mock de la función axios.head para simular respuestas exitosas
    jest.spyOn(axios, 'head').mockImplementation((url) =>
      Promise.resolve({ status: 200 })
    );

    const result = await validate(objLinks);

    expect(result).toEqual([
      {
        href: 'https://example.com',
        text: 'Link 1',
        file: 'file1.md',
        status: 200,
        ok: true,
      },
      {
        href: 'https://google.com',
        text: 'Link 2',
        file: 'file2.md',
        status: 200,
        ok: true,
      },
    ]);

    // Restaurar la implementación original de axios.head
    axios.head.mockRestore();
  });

  test('debería marcar como inválidos los links que retornen un error', async () => {
    const objLinks = [
      {
        href: 'https://example.com',
        text: 'Link 1',
        file: 'file1.md',
      },
      {
        href: 'https://google.com',
        text: 'Link 2',
        file: 'file2.md',
      },
    ];

    // Mock de la función axios.head para simular errores (404)
    jest.spyOn(axios, 'head').mockRejectedValue({ response: { status: 404 } });

    const result = await validate(objLinks);

    expect(result).toEqual([
      {
        href: 'https://example.com',
        text: 'Link 1',
        file: 'file1.md',
        status: 404,
        ok: false,
      },
      {
        href: 'https://google.com',
        text: 'Link 2',
        file: 'file2.md',
        status: 404,
        ok: false,
      },
    ]);

    // Restaurar la implementación original de axios.head
    axios.head.mockRestore();
  });
});