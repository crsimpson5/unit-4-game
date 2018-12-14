
// Character constructor
function Character(name, hp, ap, cap, image) {
  this.name = name;
  this.hp = hp;
  this.hpReset = hp;
  this.ap = ap;
  this.increment = ap;
  this.cap = cap;
  this.image = image;
};

var obiWan = new Character("Obi-Wan Kenobi", 100, 6, 12, "https://nerdist.com/wp-content/uploads/2017/12/download.jpg")
var luke = new Character("Luke Skywalker", 115, 5, 10, "https://static1.squarespace.com/static/57bc4302f5e23115c191f016/57bfb747f5e231226986071c/580b602db3db2b29f4f49b49/1477234645946/Luke+Skywalker.png?format=1000w")
var vader = new Character("Darth Vader", 95, 8, 12, "https://imagesyoulike.com/images/d/32x24/d1420.jpg")
var emperor = new Character("Emperor Palpetine", 80, 10, 15, "https://vignette.wikia.nocookie.net/evil/images/e/e2/The_Force_Lightning.jpg/revision/latest/scale-to-width-down/300?cb=20150904232551")

var characters = [obiWan, luke, vader, emperor];

var hero;
var enemy;
var heroChosen = false;
var enemyChosen = false;
var gameOver = false;

function renderDisplay() {

  $("#hero-text").text("Choose your character:");
  $("#enemy-text").text("Enemies:");
  $("#fight-text").text("Defender section:");

  // display each character
  $.each(characters, function (i) {
    var newDiv = $("<div>", { class: "hero-card" });

    newDiv.val(i);
    newDiv.append($("<h3>", { text: this.name }));
    newDiv.append($("<img>", { src: this.image }));
    newDiv.append($("<h3>", { class: "hp", text: this.hp }));

    $("#hero-list").append(newDiv);
  });
}

function reset() {

  $("#game-over").remove();
  $("#hero-list").empty();
  $("#enemy-list").empty();
  $("#fight-section").empty();

  heroChosen = false;
  enemyChosen = false;  
  gameOver = false;

  for (var i = 0; i < characters.length; i++) {
    characters[i].ap = characters[i].increment;
    characters[i].hp = characters[i].hpReset;
  }

  renderDisplay();
}

// Initial render
renderDisplay();

$("body").on("click", ".hero-card", function () {

  // if hero is chosen do nothing
  if (gameOver) return;
  if (heroChosen) return;

  hero = characters[parseInt($(this).val())];

  // display the character that was chosen
  $("#hero-text").text("Your Character:");

  $("#hero-list").empty();
  $("#hero-list").append($(this));

  // set each character as enemy that wasn't chosen
  $.each(characters, function (i) {

    if (hero !== characters[i]) {
      var newDiv = $("<div>", { class: "enemy-card" });

      newDiv.val(i);
      newDiv.append($("<h3>", { text: this.name }));
      newDiv.append($("<img>", { src: this.image }));
      newDiv.append($("<h3>", { class: "hp", text: this.hp }));

      $("#enemy-list").append(newDiv);
    }

  });

  heroChosen = true;
});

$("body").on("click", ".enemy-card", function () {

  // If enemy is chosen do nothing
  if (gameOver) return;
  if (enemyChosen) return;

  enemy = characters[parseInt($(this).val())];

  $(this).addClass("fight-card");
  $("#fight-section").append($(this));

  enemyChosen = true;
});

$("#attack-btn").on("click", function () {

  if (gameOver) return;
  if (!enemyChosen) return; 

  // subtract hero's attack power from enemy health
  enemy.hp -= hero.ap;
  $(".fight-card").find(".hp").text(enemy.hp);

  // check if enemy is still alive
  if (enemy.hp > 0) {
    
    // subtract enemy's counter ap from hero's health
    hero.hp -= enemy.cap;
    $(".hero-card").find(".hp").text(hero.hp);

    // increase hero's attack power
    hero.ap += hero.increment;

    // check if hero is still alive
    if (hero.hp <= 0) {

      gameOver = true;

      $(".hero-card").find(".hp").text("0");
      $("body").append($("<div>", { id: "game-over" }));
      $("#game-over").append($("<h2>", { text: "You died. Game Over!" }));
      $("#game-over").append($("<button>", { id: "reset-btn", text: "Play again" }));
    }
  }

  // if enemy is not alive remove him
  else {

    $(".fight-card").remove();
    
    // if there are no more enemies to fight end the game
    console.log($(".enemy-card").length);
    if ($(".enemy-card").length === 0) {

      gameOver = true;

      $("body").append($("<div>", { id: "game-over" }));
      $("#game-over").append($("<h2>", { text: "Victory! All enemies defeated." }));
      $("#game-over").append($("<button>", { id: "reset-btn", text: "Play again" }));
    } 
    else {
      enemyChosen = false;
    }
  }

});

$("body").on("click", "#reset-btn", function () {
  
  reset();

});


