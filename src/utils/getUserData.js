import faker from 'faker';

export default () => {
  const randomName = faker.name.findName();
  const randomAvatar = faker.image.avatar();

  return { name: randomName, avatar: randomAvatar };
};
