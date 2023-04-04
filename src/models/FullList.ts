import ListItem from './ListItems'

interface List {
  list: ListItem[]
  load(): void
  save(): void
  clearList(): void
  addItem(itemObj: ListItem): void
  removeItem(id: string): void
}

export default class FullList implements List {
  static instance: FullList = new FullList()

  private constructor(private _list: ListItem[] = []) {}

  set list(list: ListItem[]) {
    this._list = list
  }

  get list(): ListItem[] {
    return this._list
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('List')
    if (typeof storedList !== 'string') return

    const parsedList: {
      _id: string
      _text: string
      _checked: boolean
    }[] = JSON.parse(storedList)

    parsedList.forEach((itemObj) => {
      const newItemObj = new ListItem(
        itemObj._id,
        itemObj._text,
        itemObj._checked,
      )
      FullList.instance.addItem(newItemObj)
    })
  }

  save(): void {
    localStorage.setItem('List', JSON.stringify(this._list))
  }

  clearList(): void {
    this._list = []
    this.save()
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj)
    this.save()
  }

  removeItem(id: string): void {
    const updatedList = this._list.filter((item) => item.id !== id)
    this._list = updatedList
    this.save()
  }
}
