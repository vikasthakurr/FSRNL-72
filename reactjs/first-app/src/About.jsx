const About = () => {
  const users = [
    { id: 1, name: "vikas" },
    { id: 2, name: "akash" },
  ];
  return users.map((user) => <li key={user.id}>{user.name}</li>);
};

export default About;
