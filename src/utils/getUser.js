import Cookies from 'js-cookie';
import faker from 'faker';

const randomName = faker.name.findName();
const randomAvatar = faker.image.avatar();
const randomUser = { name: randomName, avatar: randomAvatar };

export const getUser = () => Cookies.getJSON('user');
export const setUser = (user) => Cookies.set('user', user);

if (!getUser()) {
  setUser(randomUser);
}
