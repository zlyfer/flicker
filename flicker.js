class Flicker {
	constructor(x, y, size) {
		this.size = size || 10;
		this.pos = createVector(
			x || random(this.size, width - this.size),
			y || random(this.size, height - this.size)
		);
		this.oPos = createVector(
			x || random(this.size, width - this.size),
			y || random(this.size, height - this.size)
		);
		this.oAngle = 0;
		this.oForce = 0;
		this.oNewP = 0;
		this.newP = 0;
		this.force = 0;
		this.isHover = false;
		this.isDragged = false;
		this.doFlick = false;
		this.doHit = false;
		this.doExplode = false;
		this.explosion = 0;
	}

	process() {
		this.show();
		this.isHover = this.mouseHover();
		this.dragForce();
		this.flick();
		this.hit();
		this.edge();
		this.explode();
	}


	show() {
		if (!this.doExplose) {
			if (this.isDragged && !this.doHit) {
				push();
				noStroke();
				fill(230);
				ellipse(this.pos.x, this.pos.y, this.size + maxforce)
				pop();
			}
			push();
			stroke(0);
			strokeWeight(this.size);
			point(this.pos.x, this.pos.y);
			pop();
		}
	}

	showForce(size, thick) {
		if (!this.doExplode) {
			push();
			noFill();
			if (thick) {
				strokeWeight(2);
			} else {
				strokeWeight(1);
			}
			ellipse(this.pos.x, this.pos.y, this.size + size);
			if (this.isDragged) {
				push();
				strokeWeight(12);
				stroke(0);
				translate(this.pos.x, this.pos.y)
				if (!this.doFlick) {
					let normV = createVector(1, 0);
					let mouseV = createVector(mouseX, mouseY).sub(this.pos.x, this.pos.y);
					let angle = normV.angleBetween(mouseV);
					if (mouseY < this.pos.y) {
						angle = -angle;
					}
					this.oAngle = angle;
					this.oNewP = p5.Vector.fromAngle(this.oAngle).mult((this.force / 2) + 5);
				}
				this.newP = p5.Vector.fromAngle(this.oAngle).mult((this.force / 2) + 5);
				let x = random(this.newP.x - this.force / 250, this.newP.x + this.force / 250);
				let y = random(this.newP.y - this.force / 250, this.newP.y + this.force / 250);
				point(x, y);
				strokeWeight(5);
				line(this.newP.x, this.newP.y, this.oNewP.x, this.oNewP.y);
				pop();
			}
		}
	}

	mouseHover() {
		if (!this.doFlick) {
			if (
				abs(mouseX - this.pos.x) <= (this.size + 10) &&
				abs(mouseY - this.pos.y) <= (this.size + 10)
			) {
				if (!this.isDragged) {
					this.showForce(20, true);
				}
				return true;
			}
			if (!this.isDragged) {
				this.showForce(20, false);
			}
		}
		return false;
	}

	dragForce() {
		if (mouseIsPressed && (this.isHover || this.isDragged) && !this.doFlick) {
			this.isDragged = true;
			this.force = abs(mouseX - this.pos.x) + abs(mouseY - this.pos.y)
			if (this.force < 20) {
				this.force = 20;
			}
			if (this.force > maxforce) {
				this.force = maxforce;
			}
			this.showForce(this.force, true);
		} else if (!mouseIsPressed && this.isDragged && !this.doFlick) {
			this.oForce = this.force;
			this.doFlick = true;
		} else if (!this.doFlick) {
			this.isDragged = false;
			this.force = 0;
		}
	}

	flick() {
		if (this.doFlick && this.force >= 0) {
			let m = map(this.oForce, 0, maxforce, 1, 50);
			// let m = this.oForce / 10;
			this.force -= m;
			if (this.force <= 0) {
				this.doHit = true;
			}
			if (!this.doHit) {
				this.showForce(this.oForce, true);
			}
		}
	}

	hit() {
		if (this.doHit) {
			let v = p5.Vector.fromAngle(this.oAngle).mult(this.oForce / 10);
			this.pos.sub(v);
		}
	}

	edge() {
		if (
			this.pos.x + this.size >= width ||
			this.pos.x <= this.size ||
			this.pos.y + this.size >= height ||
			this.pos.y <= this.size
		) {
			// flicker = new Flicker(width / 2, height / 2, 10);
			this.doExplode = true;
			this.doFlick = false;
			this.doHit = false;
			this.isDragged = false;
			this.force = 0;
			this.oAngle = 0;
			this.isHover = false;
			this.oNewP = 0;
			this.newP = 0;
		}
	}

	explode() {
		if (this.doExplode) {
			this.explosion += this.oForce / 10;
			for (let i = 0; i <= 360; i += 7) {
				push();
				translate(this.pos.x, this.pos.y);
				rotate(radians(i));
				stroke(0);
				strokeWeight(8)
				point(0, this.explosion);
				pop();
			}
		}
	}
}