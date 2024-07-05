export default function fibonacci(n: number) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  const fibSequence = fib.slice(0, n);

  return fibSequence[fibSequence.length - 1];
}
