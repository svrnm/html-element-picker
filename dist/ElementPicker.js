!function(){class e{constructor(e){this.hoverBox=document.createElement("div"),this.hoverBox.style.position="absolute",this.hoverBox.style.pointerEvents="none";const t={...{container:document.body,selectors:"*",background:"rgba(153, 235, 255, 0.5)",borderWidth:5,transition:"all 150ms ease",ignoreElements:[document.body],action:{}},...e};Object.keys(t).forEach(e=>{this[e]=t[e]}),this.action&&this.action.trigger&&document.addEventListener(this.action.trigger,()=>{this._triggered=!0,this._redetectMouseMove()}),this._detectMouseMove=(e=>{this._previousEvent=e;let t=e.target;if(-1===this.ignoreElements.indexOf(t)&&t.matches(this.selectors)&&this.container.contains(t)||t===this.hoverBox){if(t===this.hoverBox){const i=document.elementsFromPoint(e.clientX,e.clientY)[1];if(this._previousTarget===i)return;t=i}else this._previousTarget=t;const i=t.getBoundingClientRect(),o=i.height,s=i.width;this.hoverBox.style.width=s+2*this.borderWidth+"px",this.hoverBox.style.height=o+2*this.borderWidth+"px",this.hoverBox.style.top=i.top+window.scrollY-this.borderWidth+"px",this.hoverBox.style.left=i.left+window.scrollX-this.borderWidth+"px",this._triggered&&this.action.callback&&(this.action.callback(t),this._triggered=!1)}else this.hoverBox.style.width=0}),document.addEventListener("mousemove",this._detectMouseMove)}get container(){return this._container}set container(e){if(!(e instanceof HTMLElement))throw new Error("Please specify an HTMLElement as container!");this._container=e,this.container.appendChild(this.hoverBox)}get background(){return this._background}set background(e){this._background=e,this.hoverBox.style.background=this.background}get transition(){return this._transition}set transition(e){this._transition=e,this.hoverBox.style.transition=this.transition}get borderWidth(){return this._borderWidth}set borderWidth(e){this._borderWidth=e,this._redetectMouseMove()}get selectors(){return this._selectors}set selectors(e){this._selectors=e,this._redetectMouseMove()}get ignoreElements(){return this._ignoreElements}set ignoreElements(e){this._ignoreElements=e,this._redetectMouseMove()}_redetectMouseMove(){this._detectMouseMove&&this._previousEvent&&this._detectMouseMove(this._previousEvent)}}"undefined"!=typeof module&&void 0!==module.exports?module.exports=e:window.ElementPicker=e}();
//# sourceMappingURL=ElementPicker.js.map
