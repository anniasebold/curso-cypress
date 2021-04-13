/// <reference types="cypress" />

it('Equality', () => {
  const a = 1;
  expect(a).equal(1);
  expect(a).to.be.equal(1);
  expect('a').not.to.be.equal('b')
});

it('Truthy', () => {
  const a = true;
  const b = null;
  let c;

  expect(a).to.be.true;
  expect(b).to.be.null;
  expect(a).to.be.not.null;
  expect(c).to.be.undefined;
});

it('Object Equality', () => {
  const obj = {
    a: 1,
    b: 2
  };

  expect(obj).equal(obj);
  expect(obj).equals(obj);
  expect(obj).eq(obj);
  expect(obj).to.be.equal(obj);
  expect(obj).to.be.deep.eql({ a: 1, b: 2 });
  expect(obj).include({ b: 2 });
  expect(obj).to.have.property('b', 2)
  expect(obj).to.not.be.empty
  expect({}).to.be.empty
});

it('Arrays', () => {
  const arr = [1, 2, 3]
  expect(arr).to.have.members([1, 2, 3])
  expect(arr).to.include.members([1, 3])
  expect(arr).to.not.be.empty
  expect([]).to.be.empty
});

it('Types', () => {
  const num = 1
  const str = 'String'

  expect(num).to.be.a('number')
  expect(str).to.be.a('string')
  expect({}).to.be.an('object')
  expect([]).to.be.an('array')
});

it('Strings', () => {
  const str = 'String Teste'

  expect(str).to.be.equal('String Teste')
  expect(str).to.have.length(12)
  expect(str).to.contains('Tes')
  expect(str).to.match(/^String/)
  expect(str).to.match(/Teste$/)
});

it('Numbers', () => {
  const number = 4
  const floatNumber = 5.2123312

  expect(number).to.be.equal(4)
  expect(number).to.be.above(3)
  expect(number).to.be.below(7)

  expect(floatNumber).to.be.closeTo(5.2, 0.1)
});