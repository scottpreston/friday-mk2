var stream = [];

function getAverage(newVal){
    var colSize = 20;
    if (stream.length < colSize) {
        stream.push(newVal);
    } else {
        stream.reverse();
        stream.pop();
        stream.reverse();
        stream.push(newVal);
    }
    var tmpSum = 0;
    for (var i = 0; i < colSize; i++) {
        tmpSum += stream[i];
    }
    return (tmpSum/colSize);

}

for (var j = 0; j < 100; j++) {
    var num = parseInt(Math.random()*10);
    var avg = getAverage(num);
    var accel = num - avg;
    console.log("average = ",avg, "accel = ", accel);
}