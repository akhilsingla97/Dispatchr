import * as types from './types'

export function addItem(item) {
  return {
    type: types.ADD_ITEM,
    item
  }
}
