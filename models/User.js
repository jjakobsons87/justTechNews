const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//  create the User model
class User extends Model {}

// define table columns and configuration 
User.init(
    {
        // define an id column 
        id: {
            // use the special Sequelize DataTypes object proviced what type of data it is 
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the primark key
            primaryKey: true,
            // turn on auto invrememnt 
            autoIncrement: true
        },
        // define a username column 
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email valuse in this table 
            unique: true, 
            // if allowNull is set to false, we can run our data trhough validators before creating the table data 
            validate: {
                isEmail: true
            }
        },
        // define a password column 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four charaters long 
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)
        // pass in our imported sequelize connection (the direct connection to our db)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table 
        freezeTableName: true,
        // use underscores instaead of camel-casing (i.e. `comment_text` and not `commentText`
        underscored: true,
        // make it so our model name stays lowercase in the database 
        modelName: 'user'
    }
);

module.exports = User; 