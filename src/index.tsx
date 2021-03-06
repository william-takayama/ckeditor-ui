import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer } from 'miragejs'

import './index.css'
import App from './App'

createServer({
  routes() {
    this.namespace = 'api'

    this.get('/notes', () => ({
      notesData: {
        id: '1',
        note: {
          // eslint-disable-next-line max-len
          notes01: '<p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet mattis tellus, sit amet pharetra odio. Aenean ac urna diam. Etiam ut feugiat urna, nec maximus sapien.</strong></p><br/><ul><li><u><em>Sed vitae nisi ante. In hac habitasse platea dictumst. Cras egestas semper ipsum, eget interdum neque semper id. Etiam mauris libero, pulvinar at condimentum at, venenatis accumsan massa. Maecenas eleifend ac elit in porttitor.</em></u> Vestibulum lacinia orci sit amet gravida ullamcorper. Donec viverra nisi sed consequat bibendum.</li></ul><figure style="margin:0;"><table class="SIGNATURE" style="border-collapse:collapse"><tr><td class="SIGNATURE_label" style="border:1px solid #EDECEC;padding:8px">Signature</td><td class="SIGNATURE_signature" style="border:1px solid #EDECEC;padding:8px;width:200px"></td></tr></table></figure><br/>',
          notes02: '<table class="SIGNATURE">Signature</table>',
          // notes02: '<div class="SIGNATURE_signature">Note <b>02</b></div>',
        },
      },
    }))
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

