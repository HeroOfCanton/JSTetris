
/**
  * Contains a PIXI Graphic that always draws a rectangle, 
  * the size of the rectangle, and whether or not the rectangle
  * belongs to the player. Note that the x and y coordinates 
  * provided align it with the grid, not the actual position.
  * The actual position is the coordinate multiplied by the size.
  */
class Block {
    //Creates a PIXI Graphic based on the color, size, x and y
    //coordinates. Player is set to false by default.
    constructor(color, size, x, y) {
        this.rectangle = new PIXI.Graphics();
        this.rectangle.beginFill(color);
        this.rectangle.lineStyle(2, 0x000000);
        this.rectangle.drawRect(x*size, y*size, size, size);
        this.size = size;
        this.player = false;
    }

    //Returns the PIXI Graphics object
    getRectangle() {
        return this.rectangle;
    }

    //Sets whether or not this block belongs to the player
    //NOTE: This may not be necessary
    setPlayer(bool) {
        this.player = bool;
    }

    //Sets the x coordinate relative to the size
    setX(x) {
        this.rectangle.position.x = x*this.size;
    }

    //Sets the y coordinate relative to the size
    setY(y) {
        this.rectangle.position.y = y*this.size;
    }

    //Returns the x coordinate relative to the grid
    getX() {
        return this.rectangle.position.x;
    }

    //Returns the y coordinate relative to the grid
    getY() {
        return this.rectangle.position.y;
    }

}
/**
  * A two dimensional array that represents the game grid.
  * Each element will either hold undefined or a Block.
  */
class Grid {
    //Creates the grid based off of the width and height.
    //Also stores the size of a Block.
    constructor(width, height, size) {
        this.grid = new Array(height);
        for (var i = 0; i < height; i++) {
            this.grid[i] = new Array(width);
        }
        this.size = size;
    }

    //Returns the PIXI Graphics object at that coordinate
    getRectangle(x, y){
        return this.grid[y][x].getRectangle();
    }

    //Adds a block at the specified coordinate
    addRectangle(x, y, color) {
        var block = new Block(color, this.size, x, y);
        this.grid[y][x] = block;
        return block.getRectangle();
    }

    //Checks to see if the coordinate contains a Block or is undefined
    isEmpty(x, y) {
        if (typeof this.grid[y][x] === 'undefined')
            return true;
        else
            return false;
    }

    //Moves a rectangle in the first coordinate to the second coordinate
    moveRectangle(x1, y1, x2, y2) {
        this.grid[y2][x2] = this.grid[y1][x1];
        this.grid[y1][x1] = undefined;
        this.grid[y2][x2].setX(x2);
        this.grid[y2][x2].setY(y2);
    }
}
