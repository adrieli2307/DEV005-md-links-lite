const fs = require('fs');
const { pathValid } = require('../src/funcionespath');
const filemd = require('../src/readDoc');
const archiDoc = require ('../src/fileArchiv');

 /* -------------------------- Test ruta existente ---------------------------*/
describe('pathValid', () => {
  it('debería devolver true si la ruta existe', () => {
    const existPath = './src/hello-world.md';

    const result = pathValid(existPath);

    expect(result).toBe(true);
  });

  it('debería devolver false si la ruta no existe', () => {
    const noExistPath = './src/hello-world.txt';

    const result = pathValid(noExistPath);

    expect(result).toBe(false);
  });
});


/* -------------------------- Test de validacion archivo .md ---------------------------*/

describe('filemd', () => {
  test('debería leer el contenido del archivo .md', async () => {
    const filePath = './src/hello-world.md';

    // Llama a la función filemd con el filePath
    await filemd(filePath);

     expect.assertions(0);
  });

  test('debería mostrar un mensaje de error para un archivo que no es .md', async () => {
    const filePath = './src/hello.txt';

    // Llama a la función filemd con el filePath
    await filemd(filePath);

     expect.assertions(0);
  });

   test('debería mostrar un mensaje de error para una ruta inválida o inexistente', () => {
    const filePath = './src/hello.md';

    // Utiliza console.log para imprimir el mensaje de error
    const consoleLog = console.log;
    console.log = jest.fn();

    filemd(filePath);

    expect(console.log).toHaveBeenCalledWith('Ruta inválida o inexistente');

    console.log = consoleLog;
  });
});


/* -------------------------- Test de archivo  ---------------------------*/

const MarkdownIt = require('markdown-it');

describe('archiDoc', () => {
  test('debería extraer los links del archivo Markdown', async () => {
    const filePath = './src/hello-world.md';

    const fileContent = `This is a [link](https://example.com) inside a Markdown file`;

    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    const consoleLog = console.log;
    console.log = jest.fn();

    await archiDoc(filePath);

    expect(console.log).toHaveBeenCalledWith([{
      href: 'https://example.com',
      text: '',
      file: path.resolve(filePath)
    }]);

    console.log = consoleLog;
  });
});