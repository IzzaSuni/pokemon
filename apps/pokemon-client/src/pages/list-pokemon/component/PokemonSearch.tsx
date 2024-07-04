import { Button } from "@mui/material";
import { Form, Search } from "../list.styled";
import { UilSearch, UilTrash } from "@iconscout/react-unicons";
import { searchPokemonAtom } from "..";
import { useAtom } from "jotai";
import useBreakPoint from "@/src/utils/hooks/useBreakPoint";

export default function PokemonSearch() {
  const [search, setSearch] = useAtom(searchPokemonAtom);
  const { isDesktop } = useBreakPoint();

  return (
    <Form
      onSubmit={(e) => {
        const target = e.target as typeof e.target & {
          search: { value: string };
        };

        e.preventDefault();
        setSearch(target?.search?.value);
      }}
    >
      <Search
        name="search"
        sx={{ width: isDesktop ? "300px" : "90%" }}
        variant="outlined"
        label="search pokemon"
        onChange={({ target: { value } }) => !value.length && setSearch("")}
        InputProps={{
          endAdornment: (
            <>
              {!search && (
                <Button
                  type="submit"
                  sx={{ color: "var(--color)" }}
                  variant="text"
                >
                  <UilSearch />
                </Button>
              )}

              {!!search && (
                <Button
                  onClick={() => setSearch("")}
                  sx={{ color: "var(--color)" }}
                  variant="text"
                >
                  <UilTrash />
                </Button>
              )}
            </>
          ),
        }}
      />
    </Form>
  );
}
