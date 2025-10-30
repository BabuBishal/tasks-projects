import { usePathname } from "next/navigation";

const Customer = () => {
  const pathname = usePathname();
  const customerId = pathname && pathname.split("/").pop();
  
  // console.log(customerId);

  return <div>This is the page for customer {customerId}.</div>;
};

export default Customer;
