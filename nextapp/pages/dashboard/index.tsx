export async function getServerSideProps() {
  const res = await fetch("https://fake.jsonmockapi.com/users/1");
  const data = await res.json();
  return { props: { data }, revalidate: 90 };
}
const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
