it('sem testes, ainda', () => { })

const getSomething = callback => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1500);
    }, 3000)
  })
}

const system = () => {
  console.log('init')
  const prom = getSomething();
  prom.then(some => {
    console.log(`Something is ${some}`)
    console.log('end')
  })
}

system();