import { gql } from "@apollo/client";

export const GET_CART_ITEMS_QUERY = gql`
query CartItems {
  cartItems {
    id
    title
    description
    width
    height
    depth
    unmounting
  }
}
`;
