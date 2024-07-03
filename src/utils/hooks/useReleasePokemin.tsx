import { useAtom } from "jotai";
import { catchPokemonAtom } from "./useCatchPokemon";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function fibonacci(n: number) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  const fibSequence = fib.slice(0, n);

  return fibSequence[fibSequence.length - 1];
}

export default function useReleasePokemon() {
  const params = useParams<{ name: string }>();

  const [catchedPokemon, setCatchedPokemon] = useAtom(catchPokemonAtom);
  const { enqueueSnackbar } = useSnackbar();

  const getIsPrime = (num: number) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  function releasePokemon() {
    const randomNum = Math.floor(Math.random() * (Math.floor(1000) + 1));
    const search = catchedPokemon.find(
      (pokemon) => pokemon.pokemon_name === params?.name
    );

    const isPrime = getIsPrime(randomNum);

    if (isPrime) {
      setCatchedPokemon((pokemon) =>
        pokemon.map((v) => {
          if (v.nickname === search?.nickname) {
            const prevIterationName = ` - ${fibonacci(v.iteration)}`;
            const nextIterationName = ` - ${fibonacci(v.iteration + 1)}`;

            if (v.nickname.includes(prevIterationName) && v.iteration >= 0) {
              v.nickname = v.nickname.replace(
                prevIterationName,
                nextIterationName
              );
            } else {
              v.nickname = v.nickname + nextIterationName;
            }

            v.iteration = v.iteration + 1;
          }

          return v;
        })
      );

      enqueueSnackbar("Released!", { autoHideDuration: 3000 });
    } else {
      enqueueSnackbar("Failed releasing!", { autoHideDuration: 3000 });
    }
  }

  return { releasePokemon };
}
