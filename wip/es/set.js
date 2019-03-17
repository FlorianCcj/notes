const example = new Set([
    1, 2, 3, 
    1, 2, 3,
    true, true, 
    false, false,
    [], []
]);
example.add(11).add(12, 13);
console.log(example.delete(1));
console.log(example);
console.log(example.size);
console.log(example.has(5));
example.clear();
console.log(example);
