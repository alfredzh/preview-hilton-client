import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { gql, useMutation } from "@apollo/client";

const CREATE_RESERVATION  = gql`
  mutation CreateReservation($name: String!, $phoneNumber: String!, $arrivalAt: String!) {
    createReservation(name: $name, phoneNumber: $phoneNumber, arrivalAt: $arrivalAt)
  }
`;

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
`;

const AddReservation = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [arrivalAt, setArrivalAt] = useState(dayjs().format('YYYY-MM-DD'));

  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_RESERVATION);

  return (
    <Container>
      <Title>Add Reservation</Title>
      <div>
        <input
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <input
          type='date'
          value={arrivalAt}
          onChange={(e) => {
            setArrivalAt(dayjs(e.target.value).format('YYYY-MM-DD'));
          }}
        />
      </div>
      <div>
        <button onClick={async () => {
          await mutateFunction({variables: {name, phoneNumber, arrivalAt}});
        }}>Save</button>
      </div>
    </Container>
  );
};

export default AddReservation;
