for (var i = 1; i <= 100; i++) {
    var three = false;
    var five = false;
    if (i % 3 == 0) three = true
    if (i % 5 == 0) five = true
    console.log(three ? five ? "fizzbuzz" : "fizz" : five ? "buzz" : i)
}