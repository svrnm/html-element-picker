class ElementPicker {
    constructor(options) {
        // MUST create hover box first before applying options
        this.hoverBox = document.createElement("div");
        this.hoverBox.style.position = "absolute";

        const defaultOptions = {
            container: document.body,
            selectors: "*", // default to pick all elements
            background: "rgba(153, 235, 255, 0.5)", // transparent light blue
            borderWidth: 5,
            transition: "all 150ms ease", // set to "" (empty string) to disable
            ignoreElements: [document.body],
        }
        const mergedOptions = {
            ...defaultOptions,
            ...options
        };
        Object.keys(mergedOptions).forEach((key) => {
            if (key !== "container"){ // initialize container last
                this[key] = mergedOptions[key];
            }
        });
        
        this.container = mergedOptions.container;
    }
    get container() {
        return this._container;
    }
    set container(value) {
        if (value instanceof HTMLElement) {
            if (this.container){
                this.container.removeEventListener("mousemove", this._moveHoverBox);
            }

            this._container = value;
            this._moveHoverBox = (e) => {
                this._previousEvent = e;
                let target = e.target;
				// console.log("TCL: ElementPicker -> this._moveHoverBox -> target", target)
                if (this.ignoreElements.indexOf(target) === -1 && target.matches(this.selectors)
                    || target === this.hoverBox) { // is NOT ignored elements
                    // console.log("TCL: target", target);
                    if (target === this.hoverBox) {
                        // the truely hovered element behind the added hover box
                        const hoveredElement = document.elementsFromPoint(e.clientX, e.clientY)[1];
                        // console.log("screenX: " + e.screenX);
                        // console.log("screenY: " + e.screenY);
                        // console.log("TCL: hoveredElement", hoveredElement);
                        if (this._previousTarget === hoveredElement) {
                            // avoid repeated calculation and rendering
                            return;
                        } else {
                            target = hoveredElement;
                        }
                    } else {
                        this._previousTarget = target;
                    }
                    const targetOffset = target.getBoundingClientRect();
                    const targetHeight = targetOffset.height;
                    const targetWidth = targetOffset.width;

                    this.hoverBox.style.width = targetWidth + this.borderWidth * 2 + "px";
                    this.hoverBox.style.height = targetHeight + this.borderWidth * 2 + "px";
                    // need scrollX and scrollY to account for scrolling
                    this.hoverBox.style.top = targetOffset.top + window.scrollY - this.borderWidth + "px";
                    this.hoverBox.style.left = targetOffset.left + window.scrollX - this.borderWidth + "px";
                } else{
                    // console.log("hiding hover box...");
                    this.hoverBox.style.width = 0;
                }
            };
            this.container.addEventListener("mousemove", this._moveHoverBox);
            this.container.appendChild(this.hoverBox);
        } else{
            throw new Error("Please specify an HTML element as container!");
        }
    }
    get background() {
        return this._background;
    }
    set background(value) {
        this._background = value;

        this.hoverBox.style.background = this.background;
    }
    get transition() {
        return this._transition;
    }
    set transition(value) {
        this._transition = value;

        this.hoverBox.style.transition = this.transition;
    }
    get borderWidth(){
        return this._borderWidth;
    }
    set borderWidth(value){
        this._borderWidth = value;

        if (this._moveHoverBox){
            this._moveHoverBox(this._previousEvent);
        }
    }
    get selectors(){
        return this._selectors;
    }
    set selectors(value){
        this._selectors = value;

        if (this._moveHoverBox){
            this._moveHoverBox(this._previousEvent);
        }
    }
    get ignoreElements(){
        return this._ignoreElements;
    }
    set ignoreElements(value){
        this._ignoreElements = value;

        if (this._moveHoverBox){
            this._moveHoverBox(this._previousEvent);
        }
    }
}
const picker = new ElementPicker({
    background: "rgba(20,20,20,0.5)",
    transition: "",
    // container: document.querySelector("main"),
    // borderWidth: -5,
    // selectors: "button",
});