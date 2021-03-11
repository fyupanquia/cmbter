import Devit from "components/Devit";
import { firestore } from "firebase/admin";
import { useRouter } from "next/router";

export default function DevitPage(props) {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;

  //<Devit {...props} />
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  );
}
/*
DevitPage.getInitialProps = (context) => {
  const { query } = context;
  const { id } = query;

  return fetch(`/api/cmbits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json();
  });
};
*/
/*
export async function getServerSideProps(context) {
  const { query, res } = context;
  const { id } = query;

  const apiResponse = await fetch(`/api/cmbits/${id}`);
  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props };
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end();
  }
}
*/

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "8jtJ7p4hFWsBuIqR1Zt5" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };

      console.log("props", props);
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}
