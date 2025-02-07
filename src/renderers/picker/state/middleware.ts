/* eslint-disable unicorn/prefer-regexp-test */
import {
  clickedRestorePicker,
  openedUrl,
  retrievedInstalledApps,
} from '../../../main/state/actions'
import type { Middleware } from '../../../shared/state/model'
import { getKeyLayout } from '../../shared/utils/get-key-layout-map'
import { favAppRef } from '../refs'
import { clickedDonate, clickedMaybeLater } from './actions'

/**
 * Pass actions between main and renderers
 */
export const pickerMiddleware =
  (): Middleware =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // eslint-disable-next-line node/callback-return -- Move to next middleware
    const result = next(action)

    const doesActionOpenPicker =
      openedUrl.match(action) || clickedRestorePicker.match(action)

    if (
      doesActionOpenPicker ||
      retrievedInstalledApps.match(action) ||
      clickedDonate.match(action) ||
      clickedMaybeLater.match(action)
    ) {
      favAppRef.current?.focus()
    }

    if (doesActionOpenPicker) {
      getKeyLayout(dispatch)
    }

    return result
  }
