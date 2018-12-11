
// Character constructor
function Character(name, hp, ap, cap, image) {
  this.name = name;
  this.hp = hp;
  this.ap = ap;
  this.cap = cap;
  this.image = image;
};

var obiWan = new Character("Obi-Wan Kenobi", 100, 5, 10, "https://nerdist.com/wp-content/uploads/2017/12/download.jpg")
var luke = new Character("Luke Skywalker", 100, 5, 10, "https://static1.squarespace.com/static/57bc4302f5e23115c191f016/57bfb747f5e231226986071c/580b602db3db2b29f4f49b49/1477234645946/Luke+Skywalker.png?format=1000w")
var vader = new Character("Darth Vader", 100, 5, 10, "https://imagesyoulike.com/images/d/32x24/d1420.jpg")
var emperor = new Character("Emperor Palpetine", 100, 5, 10, "https://vignette.wikia.nocookie.net/evil/images/e/e2/The_Force_Lightning.jpg/revision/latest/scale-to-width-down/300?cb=20150904232551")

var characterList = [obiWan, luke, vader, emperor];

var heroChosen = false;

function renderDisplay() {

  $("#hero-text").text("Choose your character:");

  // display each character
  $.each(characterList, function () {

    var newDiv = $("<div>", { class: "hero-card" });
    newDiv.append($("<h3>", { class: "name", text: this.name }));
    newDiv.append($("<img>", { src: this.image }));
    newDiv.append($("<h3>" + this.hp + "</h3>"));

    $("#hero-list").append(newDiv);
  });

}

renderDisplay();

$(".hero-card").on("click", function () {

  // If hero is chosen do nothing
  if (heroChosen) {
    return;
  }

  var chosenHero = $(this).find(".name").text();

  $("#hero-text").text("Your Character:");

  $("#hero-list").empty();
  $("#hero-list").append(this);


  $.each(characterList, function (i) {

    if (chosenHero !== characterList[i].name) {
      var newDiv = $("<div>", { class: "enemy-card" });
      newDiv.append($("<h3>" + this.name + "</h3>"));
      newDiv.append($("<img>", { src: this.image }));
      newDiv.append($("<h3>" + this.hp + "</h3>"));

      $("#enemy-list").append(newDiv);
    }


  });

  heroChosen = true;

});




