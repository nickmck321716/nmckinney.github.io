function reset() {
    window.gameObj = {

        attackOccurred: false,
        winOccurred: false,
        lossOccurred: false,
        wounded: false,
        gameOver: false,
        jediMaster: false,
        characterArrayList: [

            {
                name: 'Luke SkyWalker',
                visual: 'assets/images/luke.jpg',
                healthPoints: 160,
                attackPower: 10,
                counterAttackPower: 20,
            },
            {
                name: 'Yoda',
                visual: 'assets/images/yoda.jpg',
                healthPoints: 180,
                attackPower: 15,
                counterAttackPower: 30,
            },
            {
                name: 'Less Ray',
                visual: 'assets/images/lessray.jpg',
                healthPoints: 180,
                attackPower: 7,
                counterAttackPower: 15,
            },
            {
                name: 'Darth Vader',
                visual: 'assets/images/darth.jpg',
                healthPoints: 130,
                attackPower: 15,
                counterAttackPower: 25,
            },
            {
                name: 'Kylo Wren',
                visual: 'assets/images/kylowren.jpg',
                healthPoints: 110,
                attackPower: 12,
                counterAttackPower: 20,
            },
            {
                name: 'Darth Maul',
                visual: 'assets/images/darthmaul.jpg',
                healthPoints: 100,
                attackPower: 12,
                counterAttackPower: 24,
            }

        ],

        gameStart: true,

        yourCharacter: null,

        currentEnemy: null,

        previouslyFought: [],

        yourCurrentAttackPower: null,
        winOccurred: false,


        battleSoundsArray: ['assets/audio/saberclash.mp3', 'assets/audio/saberclash1.mp3', 'assets/audio/saberclash2.mp3', 'assets/audio/saberclash3.mp3', 'assets/audio/saberclash4.mp3', 'assets/audio/saberclash5.mp3', 'assets/audio/saberclash6.mp3', 'assets/audio/spin1.mp3', 'assets/audio/spin2.mp3', 'assets/audio/spin3.mp3', 'assets/audio/spin4.mp3', 'assets/audio/spin5.mp3', 'assets/audio/spin6.mp3', 'assets/audio/swing1.mp3', 'assets/audio/swing2.mp3', ],
        characherSelectSound: 'assets/audio/saberon.mp3',


        battleSoundPick: function() {
            return this.battleSoundsArray[Math.floor(Math.random() * this.battleSoundsArray.length)];
        },

    }
};



$(document).ready(function() {
    reset();
    var audioElement = document.createElement('audio');
    audioElement.autoplay = true;
    audioElement.loop = true;
    audioElement.volume = 0.3;
    audioElement.setAttribute('src', 'assets/audio/starwars.m4a');
    var audioElement = document.createElement('audio');
    audioElement.autoplay = true;
    audioElement.setAttribute('src', 'assets/audio/instructions.m4a');


    $('#myModal').modal('show');

    function render() {

        var $charList = $('#characterList');
        var $enemyList = $('#enemyList');
        var $yourCharacter = $('#yourCharacter');
        var $attackText = $('#attackText');
        var $yourEnemy = $('#yourEnemy');
        var $winText = $('#attackText');
        var $lossText = $('#attackText');

        var $gameOver = $('#gameOver');
        var $jediText = $('#attackText');


        var $charTemplate = _.template($('#characterTmpl').html());
        var $attackTemplate = _.template($('#attackTmpl').html());
        var $winTemplate = _.template($('#winTmpl').html());
        var $lossTemplate = _.template($('#lossTmpl').html());
        var $jediTemplate = _.template($('#jediTmpl').html());

        var charHtml = "";
        $yourCharacter.html("");
        $yourEnemy.html("");
        $attackText.html("");
        $gameOver.html("");

        var listBg = gameObj.yourCharacter ? "bg-black" : "bg-white";

        gameObj.characterArrayList.forEach(function(character, index) {
            charHtml = charHtml + $charTemplate({ index: index, background: listBg, character: character });
        });
        if (gameObj.yourCharacter) {
            $yourCharacter.html($charTemplate({ index: 0, background: 'bg-white', character: gameObj.yourCharacter }));
            $enemyList.html(charHtml);
            $charList.html("");

        } else {
            $charList.html(charHtml);
            $enemyList.html("");
        }
        if (gameObj.currentEnemy) {
            $yourEnemy.html($charTemplate({ index: 0, background: 'bg-red', character: gameObj.currentEnemy }));
        }
        if (gameObj.attackOccurred) {
            $attackText.html($attackTemplate({ gameObj: gameObj }));
        }

        if (gameObj.winOccurred) {

            $winText.html($winTemplate({ lastOpponent: gameObj.lastOpponent }));

            $('#yourEnemy').empty(gameObj.currentEnemy);
        }

        if (gameObj.lossOccurred) {

            $lossText.html($lossTemplate({ gameObj: gameObj }));
        }

        if (gameObj.wounded) {
            $('#attackText').html("You are seriously wounded. GAME OVER!");
        }

        if (gameObj.gameOver) {

            var b = $('<button>');
            b.addClass('btn-primary waves-effect waves-light btn-lg');
            b.html('Battle Again!');
            reset();

            b.click(render);
            $('#gameOver').append(b);

        }
        if (gameObj.jediMaster) {

            $jediText.html($jediTemplate({ lastOpponent: gameObj.lastOpponent }));
            $('#yourEnemy').empty(gameObj.currentEnemy);

            var b = $('<button>');
            b.addClass('btn-primary waves-effect waves-light btn-lg');
            b.html('Battle Again!');
            reset();

            b.click(render);
            $('#gameOver').append(b);

        }

    }


    $('#characterList').on('click', '.characterContainer', function(e) {

        audioElement.pause();

        var element = $(this);
        var charIndex = element.data('character-index');

        if (!gameObj.yourCharacter) {

            gameObj.yourCharacter = gameObj.characterArrayList.splice(charIndex, 1)[0];

            gameObj.yourCurrentAttackPower = gameObj.yourCharacter.attackPower;
        }

        render();

        var $audioCharacter = document.createElement('audio');
        $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
        $audioCharacter.play();
    });


    $('#enemyList').on('click', '.characterContainer', function(e) {
        var element = $(this);
        var charIndex = element.data('character-index');

        if (!gameObj.currentEnemy) {

            gameObj.winOccurred = false;

            gameObj.attackOccurred = false;
            gameObj.currentEnemy = gameObj.characterArrayList.splice(charIndex, 1)[0];
        }

        render();

        var $audioCharacter = document.createElement('audio');
        $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
        $audioCharacter.play();
    });



    $('#attackBtn').on('click', function(e) {

        if (!gameObj.yourCharacter || !gameObj.currentEnemy) {
            $('#attackText').html('No enemy here, select an emeny to fight.')
            return;
        }

        gameObj.attackOccurred = true;


        var yourCharacter = gameObj.yourCharacter;
        var currentEnemy = gameObj.currentEnemy;

        gameObj.yourCurrentAttackPower = gameObj.yourCurrentAttackPower + yourCharacter.attackPower;

        currentEnemy.healthPoints = currentEnemy.healthPoints - gameObj.yourCurrentAttackPower;

        yourCharacter.healthPoints = yourCharacter.healthPoints - currentEnemy.counterAttackPower;
        console.log("enenemy health points: " + currentEnemy.healthPoints + ' your health: ' + yourCharacter.healthPoints);

        var $audioBattle = document.createElement('audio');
        $audioBattle.setAttribute('src', gameObj.battleSoundPick());
        $audioBattle.play();




        var win = (currentEnemy.healthPoints < 1 && yourCharacter.healthPoints > 1 ||
            ((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) &&
                (yourCharacter.healthPoints > currentEnemy.healthPoints))
        ) ? true : false;

        var loss = (yourCharacter.healthPoints < 1 && currentEnemy.healthPoints > 1 ||
            ((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) &&
                (yourCharacter.healthPoints < currentEnemy.healthPoints))
        ) ? true : false;




        if (win) {

            console.log('healthPoints of enemy should be equal great than or eqaul to 0: ' + currentEnemy.healthPoints);
            if (gameObj.characterArrayList.length > 0) {
                console.log(gameObj.characterArrayList.length);
                gameObj.winOccurred = true;

                gameObj.lastOpponent = gameObj.currentEnemy;
                gameObj.currentEnemy = null;


            } else if (gameObj.characterArrayList.length == 0) {

                console.log('Final Jedi Portion ' + gameObj.characterArrayList.length);
                gameObj.lastOpponent = gameObj.currentEnemy;
                gameObj.attackOccurred = false;
                gameObj.jediMaster = true;

            }


        } else if (loss) {
            gameObj.lossOccurred = true;
            console.log('Entered the loss occurred section');
            gameObj.attackOccurred = false;
            gameObj.gameOver = true;

        }
        render();

    });



    render();

});