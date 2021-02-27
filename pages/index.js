import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@c/Layout";
import { colors } from "styles/theme";
import Button from "@c/Button";
import GitHub from "@c/Icons/GitHub";
import Avatar from "@c/Avatar";
import Logo from "@c/Icons/Logo";

import { loginWithGitHub, onAuthStateChanged } from "firebase/client";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  console.log("user:", user);
  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section>
          <Logo width="100" />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 👩‍💻👨‍💻
          </h2>

          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  text={user.email}
                />
              </div>
            )}
          </div>
        </section>
      </Layout>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
