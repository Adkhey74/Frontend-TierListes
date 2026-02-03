export interface Tierlist {
  id: string
  title: string
  items: Item[]
}

export interface Item {
  id?: string
  category: string
  logoId: string
}