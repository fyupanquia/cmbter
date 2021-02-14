import Link from "next/link";
import Layout from "../../components/Layout";
export default function Timeline({ userName }) {
  return (
    <Layout>
      <h1>Welcome to the timeline</h1>
      <h2>{userName}</h2>
      <Link href="/">HOME</Link>
    </Layout>
  );
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
  .then(res => res.json())
  .then(response => {
    const { userName } = response
    return { userName}
  })
};
