$(document).ready(function() {

    $('table.table').hide()

    $("#clear-text-btn").click(function(event) {
        $("#text").val("")
        $("table.table tbody").empty()
        $('table.table').hide()
        word_chart.destroy()
    });

    $("#text-form").submit(function(event) {
        event.preventDefault()

        let text = $("#text").val()
        words = getWords(text)
        word_counts = getWordCounts(words.sort())

        $('table.table').show()
        $('table.table tbody').empty()
        word_counts.forEach((wc) => {
            $('table.table tbody').append(`<tr><th scope="row">${wc.word}</th><td>${wc.count}</td></tr>`)
        })

        generateChart(word_counts)

        console.log(word_counts)
    });

});

function getWords(text){
    text = text.replace(/[^\w\s]|_/g, "")
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    text = text.replace(/\s{2,}/g," ")
    text = text.replace(/[\n]/g," ")

    words = text.split(" ")

    lower_case_words = []
    words = words.forEach((w)=>{
        lower_case_words.push(w.toLowerCase())
    })

    return lower_case_words
}

function getWordCounts(words){
    let word_counts = {}
    words.forEach((w) => {
        if (word_counts[w]){
            word_counts[w]++
        }
        else{
            word_counts[w] = 1
        }
    })

    let word_counts_arr = []
    Object.keys(word_counts).forEach((w) => {
        word_counts_arr.push({word: w, count: word_counts[w]})
    })

    return word_counts_arr.sort((a,b) => a.count - b.count)
}

var word_chart
function generateChart(word_counts){

    var ctx = $("#word-chart")
    word_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: word_counts.map((wc) => wc.word),
            datasets: [{
                label: 'Word Counts',
                data: word_counts.map((wc) => wc.count),
                borderWidth: 1,
                borderColor: 'red'
            }]
        }
    })

    return word_chart
}