export async function getServerSideProps() {
  const res = await fetch("https://fake.jsonmockapi.com/users?length=10");
  const data = await res.json();
  return { props: { data } };
}
const Customers = ({ data }: any) => {
  console.log("userData", data);

  return (
    <div>
      <h2>User Data</h2>
      <br />
      <ul>
        {data && data.length > 0 ? (
          data.map((user: any) => (
            <li key={user.id + user.lastName}>{user.firstName}</li>
          ))
        ) : (
          <li> No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default Customers;
