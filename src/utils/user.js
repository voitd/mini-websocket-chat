import Cookies from 'js-cookie';
import faker from 'faker';

export default () => {
  const randomName = faker.name.findName();
  const randomAvatar = faker.image.avatar();

  if (!Cookies.get('user')) {
    Cookies.set('user', { name: randomName, avatar: randomAvatar });
  }

  const user = Cookies.getJSON('user');
  return user;
};
