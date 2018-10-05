class Flicker {
	constructor(x, y, s) {
		this.size = s || 10;
		this.x = x || random(this.size, width - this.size);
		this.y = y || random(this.size, height - this.size);
		this.force = 0;
		this.isHover = false;
		this.isDragged = false;

	}

	process() {
		this.show();
		this.isHover = this.mouseHover();
		this.dragForce();
		this.testStuff();
	}

	testStuff() {
		push();
		stroke(0);
		strokeWeight(1);
		let vf = createVector(this.x, this.y);
		let vm = createVector(mouseX - vf.x, mouseY - vf.y);
		let a = degrees(vf.angleBetween(vm));
		console.log(a);
		pop();
	}

	show() {
		if (this.isDragged) {
			push();
			noStroke();
			fill(230);
			ellipse(this.x, this.y, this.size + 500)
			pop();
		}
		push();
		stroke(0);
		strokeWeight(this.size);
		let x = random(this.x - this.force / 250, this.x + this.force / 250);
		let y = random(this.y - this.force / 250, this.y + this.force / 250);
		point(x, y);
		pop();
	}

	showForce(size, thick) {
		push();
		noFill();
		if (thick) {
			strokeWeight(2);
		} else {
			strokeWeight(1);
		}
		ellipse(this.x, this.y, this.size + size);
		if (this.isDragged) {
			push();
			stroke(0);
			strokeWeight(8);
			point(mouseX, mouseY);
			pop();
		}
	}

	mouseHover() {
		if (
			abs(mouseX - this.x) <= (this.size + 10) &&
			abs(mouseY - this.y) <= (this.size + 10)
		) {
			if (!this.isDragged) {
				this.showForce(20, true);
			}
			return true;
		}
		if (!this.isDragged) {
			this.showForce(20, false);
		}
		return false;
	}

	dragForce() {
		if (mouseIsPressed && (this.isHover || this.isDragged)) {
			this.isDragged = true;
			this.force = abs(mouseX - this.x) + abs(mouseY - this.y)
			if (this.force < 20) {
				this.force = 20;
			}
			if (this.force > 500) {
				this.force = 500;
			}
			this.showForce(this.force, true);
		} else {
			this.force = 0;
			this.isDragged = false;
		}
	}
}