var MovesCount=0
function randomPos(){
    var arr = [];
    while(arr.length < 9){
        var r = ((Math.floor(Math.random() * 3)+1).toString())+((Math.floor(Math.random() * 3)+1).toString());
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr
}

var RandomPos=randomPos()

for(let i =0;i<document.getElementsByClassName("tile").length;i++){
    document.getElementsByClassName("tile")[i].style.gridArea=RandomPos[i][0]+"/"+RandomPos[i][1]
}
function MoveMe(tile){
    var EmptyTile=document.querySelector(".emtile")
    var Possibilties=[
        parseInt(RandomPos[tile][0])+1==parseInt(RandomPos[8][0])&&parseInt(RandomPos[tile][1])==parseInt(RandomPos[8][1]),
        parseInt(RandomPos[tile][0])-1==parseInt(RandomPos[8][0])&&parseInt(RandomPos[tile][1])==parseInt(RandomPos[8][1]),
        parseInt(RandomPos[tile][1])+1==parseInt(RandomPos[8][1])&&parseInt(RandomPos[tile][0])==parseInt(RandomPos[8][0]),
        parseInt(RandomPos[tile][1])-1==parseInt(RandomPos[8][1])&&parseInt(RandomPos[tile][0])==parseInt(RandomPos[8][0]),
    ]
    if(Possibilties[0]||Possibilties[1]||Possibilties[2]||Possibilties[3]){
        MovesCount++;
        document.querySelectorAll('.MovesCount').forEach(el => el.textContent = `Move: ${MovesCount}`);
        EmptyTile.style.gridArea=RandomPos[tile][0]+"/"+RandomPos[tile][1];
        document.querySelectorAll(".tile")[tile].style.gridArea=RandomPos[8][0]+"/"+RandomPos[8][1];

        var CurrentTile=RandomPos[tile]
        RandomPos[tile]=RandomPos[8]
        RandomPos[8]=CurrentTile;
        NeededPos=["11","12","13","21","22","23","31","32","33"]
        if(RandomPos.join(".")==NeededPos.join(".")){
            console.log("Game Beated");
            document.querySelector(".blscreen").style.display='flex'
            document.querySelector(".MovesCount").innerHTML=MovesCount;
            var stars=0;
            if(MovesCount<100){
                stars=3
            }else if(MovesCount<200){
                stars=2
            }else if(MovesCount<300){
                stars=1
            }else{
                stars=0
            }
            for(let i=0;i<2;i++){
                document.getElementsByTagName("path").style.fill="yellow"
            }
        }
    }
}

document.getElementById('imgUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const gridSize = 3;
            const tileSize = 100; // match your CSS
            const tiles = document.querySelectorAll('.tile');

            for (let i = 0; i < tiles.length; i++) {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;

                // Create a canvas for each tile
                const canvas = document.createElement('canvas');
                canvas.width = tileSize;
                canvas.height = tileSize;
                const ctx = canvas.getContext('2d');

                // Calculate slice size
                const sliceWidth = img.width / gridSize;
                const sliceHeight = img.height / gridSize;

                // Draw the slice
                ctx.drawImage(
                    img,
                    col * sliceWidth, row * sliceHeight, sliceWidth, sliceHeight,
                    0, 0, tileSize, tileSize
                );

                // Set as background
                tiles[i].style.backgroundImage = `url(${canvas.toDataURL()})`;
                tiles[i].style.backgroundSize = 'cover';
                tiles[i].style.backgroundPosition = 'center';
                tiles[i].style.backgroundRepeat = 'no-repeat';
            }

            // Clear empty tile background
            const emptyTile = document.querySelector('.emtile');
            if (emptyTile) {
                emptyTile.style.backgroundImage = '';
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

window.addEventListener('DOMContentLoaded', function() {
    const defaultImgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'; // New image URL
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        const gridSize = 3;
        const tileSize = 100;
        const tiles = document.querySelectorAll('.tile');

        for (let i = 0; i < tiles.length; i++) {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;

            const canvas = document.createElement('canvas');
            canvas.width = tileSize;
            canvas.height = tileSize;
            const ctx = canvas.getContext('2d');

            const sliceWidth = img.width / gridSize;
            const sliceHeight = img.height / gridSize;

            ctx.drawImage(
                img,
                col * sliceWidth, row * sliceHeight, sliceWidth, sliceHeight,
                0, 0, tileSize, tileSize
            );

            tiles[i].style.backgroundImage = `url(${canvas.toDataURL()})`;
            tiles[i].style.backgroundSize = 'cover';
            tiles[i].style.backgroundPosition = 'center';
            tiles[i].style.backgroundRepeat = 'no-repeat';
        }

        const emptyTile = document.querySelector('.emtile');
        if (emptyTile) {
            emptyTile.style.backgroundImage = '';
        }
    };
    img.src = defaultImgUrl;
});
