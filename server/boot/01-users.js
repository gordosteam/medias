module.exports = function(app) {
  createDefaultUsers();

    function createDefaultUsers() {

      console.log('Creating roles and users');

      var User = app.models.usuario;
      var Role = app.models.Role;
      var RoleMapping = app.models.RoleMapping;

      var users = [];
      var roles = [{
        name: 'admin',
        users: [{
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@admin.com',
          username: 'admin',
          password: 'admin'
        }]
      }, {
        name: 'posto',
        users: [{
          firstName: 'Posto',
          lastName: 'User',
          email: 'posto@posto.com',
          username: 'posto',
          password: 'posto'
        }]
      }, {
        name: 'cliente',
        users: [{
          firstName: 'Cliente',
          lastName: 'User',
          email: 'cliente@cliente.com',
          username: 'cliente',
          password: 'cliente'
        }]
      }];

      roles.forEach(function(role) {
        Role.findOrCreate(
          {where: {name: role.name}}, // find
          {name: role.name}, // create
          function(err, createdRole, created) {
            if (err) {
              console.error('error running findOrCreate('+role.name+')', err);
            }
            (created) ? console.log('created role', createdRole.name)
                      : console.log('found role', createdRole.name);
            role.users.forEach(function(roleUser) {
              User.findOrCreate(
                {where: {username: roleUser.username}}, // find
                roleUser, // create
                function(err, createdUser, created) {
                  if (err) {
                    console.error('error creating roleUser', err);
                  }
                  (created) ? console.log('created user', createdUser.username)
                            : console.log('found user', createdUser.username);
                  createdRole.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: createdUser.id
                  }, function(err, rolePrincipal) {
                    if (err) {
                      console.error('error creating rolePrincipal', err);
                    }
                    users.push(createdUser);
                  });
                });
            });
          });
      });
      return users;
    }
};
