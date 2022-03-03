
//Globals
let DATA = null;
let FILTERED_DATA = null;
let Y_MAX = undefined;
const Y_INCREMENT = 1;
const RADIUS_NORMAL = 3;
const RADIUS_LARGE = 10;
let SALES_FUNCTION_REF = null;
const LEGEND_DIVS = Array.from(document.getElementById("legend").children).filter((element) => element.nodeName === "DIV");
const SVG = document.getElementById("svg");
const SVG_WIDTH = SVG.getAttribute("width");
const SVG_HEIGHT = SVG.getAttribute("height");
const Y_PLUS_BUTTON = document.getElementById("yaxis-plus");
const Y_MINUS_BUTTON = document.getElementById("yaxis-minus");
const US_BUTTON = document.getElementById("us-sales-button");
const EU_BUTTON = document.getElementById("eu-sales-button");
const JP_BUTTON = document.getElementById("jp-sales-button");
const GLOBAL_BUTTON = document.getElementById("global-sales-button");
const US_LABEL = "United States Sales (Millions)"
const EU_LABEL = "Europe Sales (Millions)"
const JP_LABEL = "Japan Sales (Millions)"
const GLOBAL_LABEL = "Global Sales (Millions)"
let SALES_LABEL = "";
const CRITIC_BUTTON = document.getElementById("critic-score-button");
const USER_BUTTON = document.getElementById("user-score-button");
const USER_LABEL = "User Score";
const CRITIC_LABEL = "Critic Score";
let RATING_LABEL = "";
let RATING_FUNCTION_REF = null;
const ADDITIONAL_INFO = document.getElementById("additional-info");
const ADDITIONAL_INFO_PARAGRAPHS = Array.from(ADDITIONAL_INFO.children).filter((element) => element.nodeName === "P");
const COLORS = {
    "Racing":       "#f2b6b2",
    "Sports":       "#c8c984",
    "Platform":     "#8cd6b7",
    "Misc":         "#8ed1f4",
    "Action":       "#e52323",
    "Puzzle":       "#056ea9",
    "Shooter":      "#ffdf10",
    "Fighting":     "#813c1a",
    "Simulation":   "#51d324",
    "Role-Playing": "#584785",
    "Adventure":    "#ee00ff",
    "Strategy":     "#501111FF"
};

//Wait for Page Load
window.addEventListener("load", main);

//Main Function
async function main()
{
    //Open CSV and Load Data
    DATA = await d3.csv("video_game.csv", d3.autoType);
    FILTERED_DATA = DATA.filter(game => game.Critic_Score !== "NA" && game.Name !== "Wii Sports" && game.User_Score !== "tbd" && game.User_Score !== null);
    Y_MAX = d3.max(FILTERED_DATA, function (game) { return game.Global_players; });
    SALES_FUNCTION_REF = getGlobalPlayers;
    SALES_LABEL = GLOBAL_LABEL;
    RATING_FUNCTION_REF = getCriticScore;
    RATING_LABEL = CRITIC_LABEL;

    //Setup Legend
    setupLegend();

    //Build the Initial Graph
    refreshGraph();

    //Event Listeners
    Y_PLUS_BUTTON.addEventListener("click", (event) => {
        Y_MAX += Y_INCREMENT;
        refreshGraph();
    });
    Y_MINUS_BUTTON.addEventListener("click", (event) => {
        if(Y_MAX > 1) Y_MAX -= Y_INCREMENT;
        refreshGraph();
    });
    US_BUTTON.addEventListener("click", (event) => {
        SALES_FUNCTION_REF = getUSPlayers;
        Y_MAX = d3.max(FILTERED_DATA, SALES_FUNCTION_REF);
        SALES_LABEL = US_LABEL;
        refreshGraph();
    });
    EU_BUTTON.addEventListener("click", (event) => {
        SALES_FUNCTION_REF = getEUPlayers;
        Y_MAX = d3.max(FILTERED_DATA, SALES_FUNCTION_REF);
        SALES_LABEL = EU_LABEL;
        refreshGraph();
    });
    JP_BUTTON.addEventListener("click", (event) => {
        SALES_FUNCTION_REF = getJPPlayers;
        Y_MAX = d3.max(FILTERED_DATA, SALES_FUNCTION_REF);
        SALES_LABEL = JP_LABEL;
        refreshGraph();
    });
    GLOBAL_BUTTON.addEventListener("click", (event) => {
        SALES_FUNCTION_REF = getGlobalPlayers;
        Y_MAX = d3.max(FILTERED_DATA, SALES_FUNCTION_REF);
        SALES_LABEL = GLOBAL_LABEL;
        refreshGraph();
    });
    CRITIC_BUTTON.addEventListener("click", (event) => {
        RATING_FUNCTION_REF = getCriticScore;
        RATING_LABEL = CRITIC_LABEL;
        refreshGraph();
    });
    USER_BUTTON.addEventListener("click", (event) => {
        RATING_FUNCTION_REF = getUserScore;
        RATING_LABEL = USER_LABEL;
        refreshGraph();
    });
}

function setupLegend()
{
    LEGEND_DIVS[0].style.backgroundColor = COLORS["Racing"];
    LEGEND_DIVS[1].style.backgroundColor = COLORS["Sports"];
    LEGEND_DIVS[2].style.backgroundColor = COLORS["Platform"];
    LEGEND_DIVS[3].style.backgroundColor = COLORS["Misc"];
    LEGEND_DIVS[4].style.backgroundColor = COLORS["Action"];
    LEGEND_DIVS[5].style.backgroundColor = COLORS["Puzzle"];
    LEGEND_DIVS[6].style.backgroundColor = COLORS["Shooter"];
    LEGEND_DIVS[7].style.backgroundColor = COLORS["Fighting"];
    LEGEND_DIVS[8].style.backgroundColor = COLORS["Simulation"];
    LEGEND_DIVS[9].style.backgroundColor = COLORS["Role-Playing"];
    LEGEND_DIVS[10].style.backgroundColor = COLORS["Adventure"];
    LEGEND_DIVS[11].style.backgroundColor = COLORS["Strategy"];
}

function refreshGraph()
{
    SVG.innerHTML = "";
    buildGraph();
}

function buildGraph()
{
    //Debug Output
    //console.log(DATA);

    //Setup SVG
    let svg = d3.select("svg")
        .append("g")
        .attr("transform", "translate(50, 30)");

    //Setup x Scale and y Scale
    let x_scale = d3.scaleLinear().domain([
        d3.min(FILTERED_DATA, RATING_FUNCTION_REF),
        d3.max(FILTERED_DATA, RATING_FUNCTION_REF)
    ]).range([0, SVG_WIDTH - 60]);

    let y_scale = d3.scaleLinear().domain([
        d3.min(FILTERED_DATA, SALES_FUNCTION_REF),
        Y_MAX
    ]).range([SVG_HEIGHT - 75, 0]);

    let x_axis = d3.axisBottom(x_scale).ticks(4);
    let y_axis = d3.axisLeft(y_scale).ticks(5);

    //Draw Axes
    svg.append("g").attr("transform", "translate(0, " + (SVG_HEIGHT - 75).toString() + ")").call(x_axis);
    svg.append("g").call(y_axis);

    //Draw Labels
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", SVG_WIDTH / 2)
        .attr("y", SVG_HEIGHT - 35)
        .attr("font-family", "Arial")
        .text(RATING_LABEL);

    svg.append("text")
        .attr("x", -300)
        .attr("y", -30)
        .attr("font-family", "Arial")
        .attr("transform", "rotate(-90)")
        .text(SALES_LABEL);

    //Draw Circles
    svg.append("g")
        .selectAll("circle")
        .data(FILTERED_DATA)
        .enter().append("circle")
        .attr('cx', function(game) { return x_scale(RATING_FUNCTION_REF(game)); })
        .attr('cy', function(game) { return y_scale(SALES_FUNCTION_REF(game)); })
        .attr('r', RADIUS_NORMAL)
        .attr("fill", function(game) {return COLORS[game.Genre];})
        .attr("opacity", 1)
        .attr("name", function (game) { return game.Name; })
        .on('mouseover', function(evt, game) {
            console.log(game);
            fillAdditionalInformation(game);
            d3.select(this)
                .transition()
                .duration(100)
                .ease(d3.easeLinear)
                .attr('r', RADIUS_LARGE);
        }).on('mouseleave', function(evt, game) {
            d3.select(this)
                .transition()
                .duration(100)
                .ease(d3.easeLinear)
                .attr('r', RADIUS_NORMAL);
        });
}

function fillAdditionalInformation(game)
{
    ADDITIONAL_INFO_PARAGRAPHS[0].innerHTML = game.Name;
    ADDITIONAL_INFO_PARAGRAPHS[1].innerHTML = game.Platform;
    ADDITIONAL_INFO_PARAGRAPHS[2].innerHTML = game.Genre;
    ADDITIONAL_INFO_PARAGRAPHS[3].innerHTML = game.Rating;
    ADDITIONAL_INFO_PARAGRAPHS[4].innerHTML = game.Year_of_Release;
    ADDITIONAL_INFO_PARAGRAPHS[5].innerHTML = game.Publisher;
    ADDITIONAL_INFO_PARAGRAPHS[6].innerHTML = game.Developer;
    ADDITIONAL_INFO_PARAGRAPHS[7].innerHTML = game.NA_players;
    ADDITIONAL_INFO_PARAGRAPHS[8].innerHTML = game.EU_players;
    ADDITIONAL_INFO_PARAGRAPHS[9].innerHTML = game.JP_players;
    ADDITIONAL_INFO_PARAGRAPHS[10].innerHTML = game.Global_players;
    ADDITIONAL_INFO_PARAGRAPHS[11].innerHTML = game.Critic_Score;
    ADDITIONAL_INFO_PARAGRAPHS[12].innerHTML = game.User_Score * 10;
}

function getUSPlayers(game) { return game.NA_players; }
function getEUPlayers(game) { return game.EU_players; }
function getJPPlayers(game) { return game.JP_players; }
function getGlobalPlayers(game) { return game.Global_players; }
function getCriticScore(game) { return game.Critic_Score; }
function getUserScore(game) { return game.User_Score * 10; }
