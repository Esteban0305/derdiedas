const code = ["A", "C", "7", "6", "H", "J", "L", "1", "0", "P", "R", "T", ")", "¿", "Y", "9", "8", "E", "G", "I", "3", "2", "N", "O", "Q", "+", "(", "V", "X", "Z", "B", "D", "F", "5", "4", "K", "M", "Ñ", ".", ",", "S", "U", "W", "?", " "];

const texts = [
  "Si tus labios",
  "fueran un libro",
  "no dudaria en",
  "leerlos con la",
  "punta de mis",
  "dedos antes de",
  "perderme en cada",
  "pagina +",

  "Te amo +"
];

console.clear();
texts.forEach( (text, index) => {
  let codigos = text.toUpperCase().split('').map( letra => code.indexOf(letra) );
  
  console.log(index + 1, text, codigos);
});