export default function (string){
  const palabras = string.split(' ');

  if (palabras.length > 2) {
    return palabras.slice(0, 2).join(' ') + '...';
  }

  return string;
};
