function addFive(n) {
    return n + 5;
  }
  function double(n) {
    return n * 2;
  }

  function omoka(n) {
    return n * 1000000;
  }

  function finalValue(nextValue) {
    console.log(`The final value is ${nextValue}`);
  }

  const value = 50;

  
  const mathPromise = new Promise( (resolve, reject) => {
    setTimeout( () => {
      // resolve promise if 'value' is a number; otherwise, reject it
      if (typeof value === 'number') {
        resolve(value);
      } else {
        reject('You must specify a number as the value.')
      }
    }, 1000);
  });

mathPromise
  .then(result=>addFive(result)) //10
  .then(double) //20
  .then(omoka)
  .then(finalValue)
  .catch( err => console.log(err) )

// The final value is 20