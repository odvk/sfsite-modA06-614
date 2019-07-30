const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function round() {
    // FIXME: надо бы убрать "target" прежде чем искать новый
    $('.target').removeClass('target');
    $('.miss').removeClass('miss');

    let divSelector = randomDivId();
    // console.log(divSelector);
    $(divSelector).addClass("target");
    // TODO: помечать target текущим номером
    $(divSelector).text(hits + 1);

    // FIXME: тут надо определять при первом клике firstHitTime
    if (hits === 1) {
        firstHitTime = getTimestamp();
    };
    if (hits === maxHits) {
        endGame();
    };

    // getTimestamp;
}

function endGame() {
    // FIXME: спрятать игровое поле сначала
    $('.game-field').hide();

    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $("#total-time-played").text(totalPlayedSeconds);
    $("#total-fails").text(fails)

    $("#win-message").removeClass("d-none");
}

function handleClick(event) {
    let target = $(event.target)
    // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    if (target.hasClass("target")) {
        hits = hits + 1;
        target.text("");
        round();
    }
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    else {
        target.addClass("miss");
        fails += 1;
        // console.log(fails)
    }

}

function init() {
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    round();

    $(".game-field").click(handleClick);

    $("#button-reload").click(function () {
        location.reload();
    });
}

$(document).ready(init);
