// still using cjs because of sequelize-cli < 7.0.0
// https://github.com/sequelize/cli/issues/1156#issuecomment-1327246723

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Links',
      [
        {
          id: 1,
          url: 'https://lunii.org',
          clicks: 1000,
          createdAt: new Date('August 19, 2019 23:15:30'),
          updatedAt: new Date('August 19, 2019 23:15:30'),
        },
        {
          id: 2,
          url: 'https://ryogasp.com',
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('Links', [], {})
  },
}
