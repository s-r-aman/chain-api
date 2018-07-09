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
  ({ token, name, age, gender, newPassword, currentPassword }) => `mutation {
        editProfile(
          token: "${token}",
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
      }`,
  ({ token, name, diff_level, icon, reminder }) => `mutation {
        addHabit(
          token: "${token}",
          name: "${name}",
          diff_level: ${diff_level},
          icon: "${icon}",
          reminder: "${reminder}"
        ){
          id,
          name,
          diff_level,
          icon,
          reminder
        }
      }`
]
