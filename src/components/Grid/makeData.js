import faker from 'faker';

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i)

const newPerson = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
  dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();  // First month is "1"

  return {
    firstName: firstName,
    lastName: lastName,
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    phone: faker.phone.phoneNumberFormat(3),
    userName: faker.internet.userName(firstName, lastName),
    dob: dob,
    email: faker.internet.email(firstName, lastName),
  }
}

const makeData = length => {
  return Array.from({ length }, (_, index) => ({ id: index, ...newPerson() }));
}

export default makeData;
