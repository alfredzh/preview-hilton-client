import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import ReservationItem from "./ReservationItem";

const RESERVATION_LIST = gql`
  query GetReservations {
    reservations {
      id
      name
      status
      phoneNumber
      arrivalAt
      createdAt
    }
  }
`;

const Container = styled.div``;

const ReservationTable = styled.table`
  width: 100%;
`;

const ReservationTableTh = styled.th`
  border: 1px solid gray;
`;

const ReservationList = () => {
  const { loading, error, data, refetch } = useQuery<{
    reservations: {
      id: string;
      name: string;
      status: string;
      phoneNumber: string;
      arrivalAt: string;
      createdAt: string;
    }[];
  }>(RESERVATION_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      {!data || data?.reservations.length === 0 ? (
        "No reservations found"
      ) : (
        <ReservationTable>
          <thead>
            <tr>
              <ReservationTableTh>ID</ReservationTableTh>
              <ReservationTableTh>Status</ReservationTableTh>
              <ReservationTableTh>Name</ReservationTableTh>
              <ReservationTableTh>Phone Number</ReservationTableTh>
              <ReservationTableTh>Arrival At</ReservationTableTh>
              <ReservationTableTh>Created At</ReservationTableTh>
              <ReservationTableTh>Edit</ReservationTableTh>
            </tr>
          </thead>
          <tbody>
            {data?.reservations.map((item) => (
              <ReservationItem item={item} key={item.id} refetch={() => {refetch()}}/>
            ))}
          </tbody>
        </ReservationTable>
      )}
    </Container>
  );
};

export default ReservationList;
