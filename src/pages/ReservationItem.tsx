import { gql, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";

const UPDATE_RESERVATION = gql`
  mutation UpdateReservation(
    $id: ID!
    $name: String
    $phoneNumber: String
    $arrivalAt: String
    $status: String
  ) {
    updateReservation(
      id: $id
      name: $name
      phoneNumber: $phoneNumber
      arrivalAt: $arrivalAt
      status: $status
    )
  }
`;

const ReservationTableTd = styled.td`
  border: 1px solid gray;
`;

const ReservationItem = (props: {
  refetch: () => void;
  item: {
    id: string;
    name: string;
    status: string;
    phoneNumber: string;
    arrivalAt: string;
    createdAt: string;
  };
}) => {
  const [newStatus, setNewStatus] = useState<string | undefined>(undefined);
  const { item } = props;

  const [mutateFunction, { data, loading, error }] = useMutation(UPDATE_RESERVATION);

  return (
    <tr>
      <ReservationTableTd>{item.id}</ReservationTableTd>
      <ReservationTableTd>
        {item.status}
        <select value={newStatus} onChange={(e) => {setNewStatus(e.target.value)}}>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </select>
      </ReservationTableTd>
      <ReservationTableTd>{item.name}</ReservationTableTd>
      <ReservationTableTd>{item.phoneNumber}</ReservationTableTd>
      <ReservationTableTd>
        {dayjs(Number(item.arrivalAt)).format("YYYY-MM-DD HH:mm:ss")}
      </ReservationTableTd>
      <ReservationTableTd>
        {dayjs(Number(item.createdAt)).format("YYYY-MM-DD HH:mm:ss")}
      </ReservationTableTd>
      <ReservationTableTd>
        <button
          onClick={async () => {
            let status = item.status
            if (newStatus) {
              status = newStatus;
            }
            const res = await mutateFunction({
              variables: {
                id: item.id,
                name: item.name,
                phoneNumber: item.phoneNumber,
                arrivalAt: item.arrivalAt,
                status: newStatus,
              },
            });

            if (res.data?.updateReservation) {
              props.refetch()
            }
          }}
        >
          Save
        </button>
      </ReservationTableTd>
    </tr>
  );
};

export default ReservationItem;
