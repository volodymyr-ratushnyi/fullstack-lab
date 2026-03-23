export interface Hasher {
  compare(plain: string, hashed: string): Promise<boolean>
}
