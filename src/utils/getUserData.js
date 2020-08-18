import Cookies from 'js-cookie';
import faker from 'faker';

export default () => {
  const randomName = faker.name.findName();
  const randomAvatar = faker.image.avatar();
  const randomUser = { name: randomName, avatar: randomAvatar };

  const user = Cookies.getJSON('user') ?? randomUser;
  Cookies.set('user', user);

  return user;
};
