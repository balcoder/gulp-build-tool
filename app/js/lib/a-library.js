(function() {
  console.log('This is a library. It should be the first file: coming from a-library.js');
})();

function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
