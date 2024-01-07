/* eslint-disable no-restricted-syntax */

// start and end are arrays of coordinates
function getPossibleMoves([x, y]) {
  const moves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
  ];
  return moves.filter(([mx, my]) => mx >= 0 && mx < 8 && my >= 0 && my < 8);
}

function knightMoves(start, end) {
  console.log(`Start: ${start}, End: ${end}`);
  if (start[0] === end[0] && start[1] === end[1]) {
    return { path: [start], message: '0 moves needed (already at final position)' };
  }

  const queue = [[start, [start]]];
  const visited = new Set([start.toString()]);

  while (queue.length > 0) {
    const [pos, path] = queue.shift();
    const moves = getPossibleMoves(pos);

    for (const move of moves) {
      if (!visited.has(move.toString())) {
        visited.add(move.toString());
        const newPath = path.concat([move]);
        if (move[0] === end[0] && move[1] === end[1]) {
          const movesCount = newPath.length - 1;
          return {
            path: newPath,
            message: `Made it in ${movesCount} moves!`,
          };
        }
        queue.push([move, newPath]);
      }
    }
  }
  return { path: [], message: 'No path found' };
}

const result = knightMoves([0, 0], [7, 7]);
console.log(result);
