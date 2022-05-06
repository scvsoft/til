export class Printer {
  constructor(
    /** A message to print. */
    private readonly message: string
  ) {}

  print() {
    console.log(this.message)
  }
}
