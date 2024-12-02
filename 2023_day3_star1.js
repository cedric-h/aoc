const DEBUG = false;
const problem = DEBUG ?
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..` : document.body.textContent.trim();

const board = problem.split('\n').map(x => x.split(''));
const width = board.length;
const height = board[0].length;

let symbols = new Set();
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        const char = board[y][x];
        if (isNaN(parseInt(char)) && char != '.') {
            console.log(char, x, y)
            symbols.add(x + ',' + y);
        }
    }
}

let sum = 0;

for (const match of problem.replaceAll('\n', '').matchAll(/\d+/g)) {
    console.log(match.index, match[0].length);

    let d_x = match.index % width;
    let d_y = Math.floor(match.index / width);

    let near_symbol = false;
    for (let i = 0; i < match[0].length; i++) {
        const final_x = d_x + i;
        
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                const key = (final_x + x) + ',' + (d_y + y);
                if (symbols.has(key))
                    near_symbol = true;
            }
        }
    }

    console.log(match[0], { index: match.index, d_x, d_y, near_symbol })

    sum += near_symbol * parseInt(match[0]);
}

sum
