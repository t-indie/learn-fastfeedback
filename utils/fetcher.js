export default async (...args) => {
  const res = await fetch(...args);

  return res.json();
};

// const Named = () => <div />;
// export default Named;
