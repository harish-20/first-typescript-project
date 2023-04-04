import FullList from '../models/FullList'

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate()

  ul!: HTMLUListElement

  constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()

    fullList.list.forEach((item) => {
      const listElement: HTMLLIElement = document.createElement(
        'li',
      ) as HTMLLIElement
      listElement.classList.add('item')

      const checkbox: HTMLInputElement = document.createElement(
        'input',
      ) as HTMLInputElement
      checkbox.type = 'checkbox'
      checkbox.checked = item.checked
      checkbox.id = item.id

      checkbox.addEventListener('click', () => {
        item.checked = !item.checked
        fullList.save()
      })

      const label: HTMLLabelElement = document.createElement(
        'label',
      ) as HTMLLabelElement
      label.innerText = item.text
      label.htmlFor = item.id

      const button: HTMLButtonElement = document.createElement(
        'button',
      ) as HTMLButtonElement
      button.innerText = 'X'
      button.classList.add('button')

      button.addEventListener('click', () => {
        fullList.removeItem(item.id)
        this.render(fullList)
      })

      listElement.appendChild(checkbox)
      listElement.appendChild(label)
      listElement.appendChild(button)

      this.ul.appendChild(listElement)
    })
  }
}
