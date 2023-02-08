// still using cjs because of sequelize-cli < 7.0.0
// https://github.com/sequelize/cli/issues/1156#issuecomment-1327246723

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      clicks: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('Links')
  },
}
