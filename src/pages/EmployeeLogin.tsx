import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const CommonInput = styled.input`
  margin: 0 5px;
`;

const Content = styled.div`
  text-align: center;
`;

const SubmitButton = styled.button`
  margin: 0 5px;
`;

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useLazyQuery<{
    login: string;
  }>(LOGIN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Title>Employee Login</Title>
      <Content>
        <CommonInput
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <CommonInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <SubmitButton
          onClick={async () => {
            const res = await login({ variables: { username, password } });

            if (!res.data?.login) {
              alert("Invalid username or password");
              return;
            }
            localStorage.setItem("token", res.data?.login);

            window.location.href = "/";
          }}
        >
          Login
        </SubmitButton>
      </Content>
    </Container>
  );
};

export default EmployeeLogin;
