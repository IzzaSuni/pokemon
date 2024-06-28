import useGetListPokemons from "@/src/network/useGetListPokemons";

export default function ListPokemons() {
  const { data } = useGetListPokemons({ page: 1 });

  return <>hi</>;
}
