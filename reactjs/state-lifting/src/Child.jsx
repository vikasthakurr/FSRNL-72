const Child = (props) => {
  //   console.log(props)
  const handleChange = (e) => {
    props.setName(e.target.value);
  };
  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        placeholder="enter username"
      ></input>
    </div>
  );
};

export default Child;
