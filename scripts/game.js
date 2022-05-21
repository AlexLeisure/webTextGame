function Tile(classes, text){
    this.classes = classes;
    this.text = text;
}
function Vector2(x, y){
    this.x = x;
    this.y = y;
}



const gameWindow = document.querySelector("#game-window");
const leftButton = document.querySelector('[name="left"]');
const upButton = document.querySelector('[name="up"]');
const downButton = document.querySelector('[name="down"]');
const rightButton = document.querySelector('[name="right"]');


function tileTemplate(data){
    return `<span class="${data.classes}">${data.text}</span>`;
}
// function mapToHtml(map){
//     html = "";
//     map.forEach(element => {
//         element.forEach(tile => {
//             html += tileTemplate(tile);
//         });
//     });
//     return html;
// }


let tempPos = new Vector2(3, 4);
let playerPos = new Vector2(3, 4);
const displayDimensions = new Vector2(20,20);
const fullMapDim = new Vector2(30,30);

let map = [];


//uses displayDimensions to paint 20 tiles starting from the startPos
function mapToHtml(map, startPos){
    html = "";
    for(i=startPos.y; i<(startPos.y+displayDimensions.y); i++){
        for(j=startPos.x; j<(startPos.x+displayDimensions.x); j++){
            html += tileTemplate(map[i][j]);
        }
    }
    return html;
}

/**
 * 
 * @param {*} map map to use 
 * @param {*} xOff x offset for the camera position
 * @param {*} yOff y offset for the camera position
 * @param {*} dim the maximum dimensions of the map (NOT THE DISPLAY)
 * @returns 
 */
function repaint(map, xOff, yOff, dim){
    if( (tempPos.x + xOff) < 0 || 
        (tempPos.x + xOff + displayDimensions.x) > dim.x){
        console.log(tempPos.x + xOff)
        console.log(tempPos.x + xOff + displayDimensions.x + ` > ${dim.x}`)
        return;
    }
    if( (tempPos.y + yOff) < 0 || 
        (tempPos.y + yOff + displayDimensions.y) > dim.y){
        console.log(tempPos.y + yOff)
        console.log(tempPos.y + yOff + displayDimensions.y + ` > ${dim.y}`)
        
        return;
    }
    tempPos.x = tempPos.x + xOff;
    tempPos.y = tempPos.y + yOff;

    gameWindow.innerHTML = mapToHtml(map, tempPos, displayDimensions);
}

for(i=0; i<fullMapDim.y; i++){
    let row = [];
    for(j=0; j<fullMapDim.x; j++){
        row.push(i === j || i === 15? new Tile('tile test-tile-2', 'T') : 
                            new Tile('tile test-tile', '#'));
    }
    map.push(row);
}

gameWindow.innerHTML = mapToHtml(map, tempPos);
console.log(tempPos);


leftButton.addEventListener('click', () => repaint(map, -1, 0, fullMapDim));
upButton.addEventListener('click', () => repaint(map, 0, -1, fullMapDim));
downButton.addEventListener('click', () => repaint(map, 0, 1, fullMapDim));
rightButton.addEventListener('click', () => repaint(map, 1, 0, fullMapDim));

