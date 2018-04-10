import Tooltip from 'taucharts/dist/plugins/tooltip'

import { format } from 'date-fns'

function tooltip () {
  const time = {
    label: 'Time',
    format (epoch) {
      return format(epoch, 'DD/MM/YYYY HH:mm')
    }
  }

  const formatters = {
    time
  }

  return Tooltip({ formatters })
}

export default tooltip
