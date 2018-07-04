class Particule {
  constructor(_position, _color, _target) {
    this.position = _position;
    this.velocity = new p5.Vector(random(-1, 1), random(-1, 1));
    this.acceleration = new p5.Vector(0, 0);
    this.target = _target;
    this.color = _color;
  }
  render() {
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
  update() {
    let desired = p5.Vector.sub(this.target, this.position);
    desired.setMag(map(desired.mag(), 0, 100, 0, 2));
    this.acceleration = p5.Vector.sub(desired, this.velocity);

    this.velocity = this.acceleration;
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

let particules = [];
let flag = "US";
let fr = 0;

function setup() {
  createCanvas(2 * (15 * 3) * 10, 2 * 20 * 10);
  noStroke();

  let tx = 5,
    ty = 5;
  let loop = 0;
  for (let i = 0; i < (width / 10) * (height / 10); i++) {
    let position = new p5.Vector(random(width), random(height));
    let color = [0, 0, 0];
    switch (flag) {
      case "France":
        if (tx < 1 * 15 * 20) {
          color = [0, 0, 255];
        } else if (tx < 2 * 15 * 20) {
          color = [255, 255, 255];
        } else if (tx < 3 * 15 * 20) {
          color = [255, 0, 0];
        }
        break;
      case "US":
        if (loop % 2 === 0) {
          color = [255, 0, 0];
        } else {
          color = [255, 255, 255];
        }
        break;
    }
    if (flag === "US" && tx < width / 3 && ty < height / 2.2) {
      color = [0, 0, 255];
    }
    let target = new p5.Vector(tx, ty);
    let p = new Particule(position, color, target);
    particules.push(p);
    loop ++;
    if (ty + 5 < height - 5) {
      ty += 10;
    } else {
      ty = 5, tx += 10; loop = 0;
    }
  }
}

function mousePressed() {
  fr = 0;
  for (particule of particules) {
    particule.target.x = mouseX;
    particule.target.y = mouseY;
  }
}

function draw() {
  background(51);
  if (fr >= 350) {
    for (particule of particules) {
      particule.velocity.mult(0);
      particule.acceleration.mult(0);
    }
  } else {
    fr++;
  }
  for (particule of particules) {
    particule.render();
    particule.update();
  }
}
