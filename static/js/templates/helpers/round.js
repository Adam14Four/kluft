define('templates/helpers/round', ['Handlebars'], function(Handlebars) {
    function round(n, block) {
        return n.toFixed(block);
    }
    Handlebars.registerHelper('round', round);
    return round;
});