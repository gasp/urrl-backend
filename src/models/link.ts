import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'

interface LinkModel
  extends Model<
    InferAttributes<LinkModel>,
    InferCreationAttributes<LinkModel>
  > {
  // Some fields are optional when calling LinkModel.create() or LinkModel.build()
  id: CreationOptional<number>
  url: string
  clicks: CreationOptional<number>
}

export const LinkModel = (sequelize: Sequelize) => {
  const Link = sequelize.define<LinkModel>(
    'Link',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER, // fiddle with INTEGER.UNSIGNED (unsupported by sqlite)
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      clicks: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {},
  )
  return Link
}
