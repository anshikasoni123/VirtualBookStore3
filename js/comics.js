AFRAME.registerComponent("comics",{
    schema:{
       state:{type:"string",default:"comics-list"},
       selectedComics:{type:"string",default:"#comic1"}
    },
    init:function(){
          this.placesContainer = this.el;
          this.createCards();
    },
    tick:function(){
       const {state} = this.el.getAttribute("comics");
       if(state === "view"){
        this.hideEl([this.placesContainer]);
        this.showView();
       }
    },
    hideEl:function(elList){
      elList.map(el=>{
        el.setAttribute("visible",false)
      })
    },
    showView:function(){
          const {selectedComics} = this.data;
          const skyEl = document.querySelector("#comic-base");
          skyEl.setAttribute("material",{
            src: `./assets/story/${selectedComics}/img_1.jpg`,
            color:"#fff"
          });
          skyEl.setAttribute("visible",true)
    },
    createCards : function(){
        const comics = [
            {
                id : "super-man",
                title: "SUPER MAN",
                url:"./assets/comics/superman.jpg",
            },
            {
                id : "spider-man",
                title: "SPIDER MAN",
                url:"./assets/comics/spiderman.jpg",
            },
            {
                id : "captain-aero",
                title: "CAPTAIN AERO",
                url:"./assets/comics/captainaero.jpg",
            },
            {
                id : "outer-space",
                title: "OUTER SPACE",
                url:"./assets/comics/outerspace.jpg",
            }
        ];

        let previousXPosition = -60;

        for(var item of comics){
            const posX = previousXPosition + 28;
            const posY = 10;
            const posZ = -40;
            const position = {x:posX,y:posY,z:posZ}
            previousXPosition = posX;

            const borderEl = this.createBorder(position,item.id);
            const comicEl = this.createComics(item);
            borderEl.appendChild(comicEl);
            const titleEl = this.createTitle(position,item);
            borderEl.appendChild(titleEl);
    
            this.placesContainer.appendChild(borderEl);
        }

        
    },
    createBorder: function(position,id){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id",id);
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("geometry",{
            primitive:"ring",
            radiusInner:12,
            radiusOuter:13
        });
        entityEl.setAttribute("material",{
            color:"white",
            opacity:1
        });
        entityEl.setAttribute("position",position);
        entityEl.setAttribute("cursor-event",{})
        return entityEl
    },
    createComics: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:12
        });
        entityEl.setAttribute("material",{
            src:item.url
        });
        return entityEl
    },
    createTitle: function(position,item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("text",{
            font:"exo2bold",
            align:"center",
            width:70,
            color:"black",
            value:item.title
        });
        const elPosition = position;
        elPosition.y = -25;
        entityEl.setAttribute("position",elPosition)
        return entityEl
    }
})