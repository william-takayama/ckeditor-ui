import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import i18n from '../../../../locales/i18n'

// eslint-disable-next-line max-len
const ImportNotesIcon = '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 251.882 251.882" style="enable-background:new 0 0 251.882 251.882;" xml:space="preserve"><g><path d="M215.037,36.846c-49.129-49.128-129.063-49.128-178.191,0c-49.127,49.127-49.127,129.063,0,178.19   c24.564,24.564,56.83,36.846,89.096,36.846s64.531-12.282,89.096-36.846C264.164,165.909,264.164,85.973,215.037,36.846z    M49.574,202.309c-42.109-42.109-42.109-110.626,0-152.735c21.055-21.054,48.711-31.582,76.367-31.582s55.313,10.527,76.367,31.582   c42.109,42.109,42.109,110.626,0,152.735C160.199,244.417,91.683,244.417,49.574,202.309z"/><path d="M194.823,116.941h-59.882V57.059c0-4.971-4.029-9-9-9s-9,4.029-9,9v59.882H57.059c-4.971,0-9,4.029-9,9s4.029,9,9,9h59.882   v59.882c0,4.971,4.029,9,9,9s9-4.029,9-9v-59.882h59.882c4.971,0,9-4.029,9-9S199.794,116.941,194.823,116.941z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'

export default class ImportNotesTemplateUI extends Plugin {
  init() {
    const { editor } = this

    editor.ui.componentFactory.add('importNotesTemplate', (locale: any) => {
      const command = editor.commands.get('insertImportNotesTemplate')
      const buttonView = new ButtonView(locale)

      buttonView.set({
        icon: ImportNotesIcon,
        label: i18n.t('Common:NOTES_TEMPLATE'),
        tooltip: true,
      })

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      this.listenTo(buttonView, 'execute', () => editor.execute('insertImportNotesTemplate'))

      return buttonView
    })
  }
}