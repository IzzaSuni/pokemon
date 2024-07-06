import { Pagination, TextField, Typography, styled } from "@mui/material";

export const Avatar = styled("img")`
  border: 1px solid var(--color);
  border-radius: 100%;
  background: var(--color);
  width: 90px;
  height: 90px;
  min-width: 90px;
  min-height: 90px;
  max-width: 90px;
  max-height: 90px;
  object-fit: scale-down;
`;

export const Text = styled(Typography)`
  span {
    position: relative;
    background: linear-gradient(0deg, #fff95b 0%, #ff930f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Pokemon Solid";
  }
`;

export const TextInput = styled(TextField)`
  border-radius: 8px;

  label,
  input {
    color: var(--background-color) !important;
    border-radius: 8px;
  }

  fieldset {
    border-color: var(--background-color-2) !important;
    border-radius: 8px;
  }
`;

export const Search = styled(TextInput)`
  margin: 32px auto;

  label,
  input {
    color: var(--color) !important;
    border-radius: 8px;
  }

  fieldset {
    border-color: var(--color) !important;
    border-radius: 8px;
  }
`;

export const Form = styled("form")`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PaginationStyled = styled(Pagination)`
  padding-top: 24px;
  justify-content: center;
  display: flex;

  button {
    border-color: var(--color);
    color: var(--color);
  }
`;
