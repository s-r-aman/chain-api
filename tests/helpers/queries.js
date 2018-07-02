module.exports = [
  ({ username, name, password, age, gender }) => `mutation {
        signUp(
          username: "${username}",
          name: "${name}",
          password: "${password}",
          age: ${age},
          gender: "${gender}"
        ){
          username,
          name,
          age,
          gender,
          token
        }
      }`,
  ({ username, name, password }) => `mutation {
        signUp(
          username: "${username}",
          name: "${name}",
          password: "${password}",
        ){
          username,
          name,
          age,
          gender,
          token
        }
      }`,
  ({
    token,
    username,
    name,
    age,
    gender,
    newPassword,
    currentPassword
  }) => `mutation {
        editProfile(
          token: "${token}",
          username: "${username}",
          name: "${name}",
          age: ${age},
          gender: "${gender}",
          newPassword: "${newPassword}",
          currentPassword: "${currentPassword}"
        ){
          username,
          name,
          age,
          gender,
          token
        }
      }`
]
