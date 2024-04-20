class ImagePool {
    constructor() {
        this.p = [];
        this.c = -1;
    }
    // add at the end
    a(i) {
        this.p.push(i);
    }
    // overwrite at index
    i(idx, i) {
        this.p[idx] = i;
    }
    // get image at index 
    g(idx) {
        if(idx !== undefined) {
            return this.p[idx];
        }
        this.c++;
        if(this.c >= this.p.length) {
            this.c = 0;
        }
        return this.p[this.c];
    }
    // get length of image-pool
    l() {
        return this.p.length;
    }
}