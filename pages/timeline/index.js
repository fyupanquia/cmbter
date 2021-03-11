import Link from "next/link";
export default function Timeline({ userName }) {
  return (
    <>
      <h1>Welcome to the timeline</h1>
      <h2>{userName}</h2>
      <Link href="/">HOME</Link>
    </>
  );
}

Timeline.getInitialProps = () => {
  return fetch("http://localhost:3000/api/hello")
    .then((res) => res.json())
    .then((response) => {
      const { userName } = response;
      return { userName };
    });
};
