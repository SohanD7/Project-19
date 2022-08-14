var field,player,ball,ufo,bomb;
var score = 0;
var gameState = "play";

function preload()
{
    fieldImage = loadImage("field.jpg");
    playerImage = loadAnimation("player1.png","player2.png");
    ballImage = loadImage("ball.png");
    ufoImage = loadImage("ufo.png");
    bombImage = loadImage("bomb.png");
    playerStoppedImage = loadAnimation("player1.png");
}

function setup() 
{
    createCanvas(700,700);

    field = createSprite(350,350);
    field.addImage(fieldImage);
    field.scale = 2.1;
    field.velocityY = 3;

    player = createSprite(350,630);
    player.addAnimation("running",playerImage);
    player.addAnimation("stopped",playerStoppedImage);
    player.scale = 0.2;
    player.setCollider("circle",7,7);

    balls = createGroup();
    ufos = createGroup();
    bombs = createGroup();
}

function createBalls()
{
    if (frameCount % 150 == 0 && frameCount > 0)
    {
        ball = createSprite(Math.round(random(30,670)),60);
        ball.addImage(ballImage);
        ball.scale = 0.06;
        ball.velocityY = 9;
        ball.lifetime = 200;
        balls.add(ball);
    }
}

function createUfos()
{
    if (frameCount % 75 == 0 && frameCount > 0)
    {
        ufo = createSprite(Math.round(random(30,670)),60);
        ufo.addImage(ufoImage);
        ufo.scale = 0.04;
        ufo.velocityY = 10;
        ufo.lifetime = 200;
        ufos.add(ufo);
    }
}

function createBombs()
{
    if (frameCount % 75 == 0 && frameCount > 0)
    {
        bomb = createSprite(Math.round(random(30,670)),60);
        bomb.addImage(bombImage);
        bomb.scale = 0.04;
        bomb.velocityY = 10;
        bomb.lifetime = 200;
        bombs.add(bomb);
    }
}

function draw()
{
    textSize(15);
    fill("white");
    text("Score: "+score,323,390);
    if(gameState == "play")
    {   
        if (field.y > 380)
        {
            field.y = 200;
        }

        player.x = World.mouseX;

        createBalls();
        createUfos();
        createBombs();

        if(ufos.isTouching(player) || bombs.isTouching(player))
        {
            gameState = "stop";
        }

        if(balls.isTouching(player))
        {
            ball.destroy();
            score++;
        }
        
        drawSprites();
    }

    if(gameState == "stop")
    {
        field.velocityY = 0;
        player.changeAnimation("stopped");
        balls.setVelocityYEach(0);
        ufos.setVelocityYEach(0);
        bombs.setVelocityYEach(0);
        player.velocityY = 0;
        balls.setLifetimeEach(-1);
        ufos.setLifetimeEach(-1);
        bombs.setLifetimeEach(-1);
        textSize(40);
        fill("red");
        text("You lose!",275,350);
    }
}