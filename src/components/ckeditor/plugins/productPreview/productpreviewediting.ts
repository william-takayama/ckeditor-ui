/* eslint-disable no-underscore-dangle */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
// @ts-ignore
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils'
// @ts-ignore
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
import InsertProductPreviewCommand from './insertproductpreviewcommand'

export default class ProductPreviewEditing extends Plugin {
  static get requires() {
    return [Widget]
  }

  init() {
    this._defineSchema()
    this._defineConverters()

    // @ts-ignore
    this.editor.commands.add('insertProduct', new InsertProductPreviewCommand(this.editor))
  }

  _defineSchema() {
    const { schema } = this.editor.model

    schema.register('productPreview', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',

      // Each product preview has an ID. A unique ID tells the application which
      // product it represents and makes it possible to render it inside a widget.
      allowAttributes: ['id'],
    })
  }

  _defineConverters() {
    const { editor } = this
    const { conversion } = editor
    const renderProduct = editor.config.get('products').productRenderer

    // <productPreview> converters ((data) view → model)
    conversion.for('upcast').elementToElement({
      view: {
        name: 'section',
        classes: 'product',
      },
      model: (viewElement: any, { writer: modelWriter }: any) =>
      // Read the "data-id" attribute from the view and set it as the "id" in the model.
        modelWriter.createElement('productPreview', {
          // eslint-disable-next-line radix
          id: parseInt(viewElement.getAttribute('data-id')),
        }),

    })

    // <productPreview> converters (model → data view)
    conversion.for('dataDowncast').elementToElement({
      model: 'productPreview',
      view: (modelElement: any, { writer: viewWriter }: any) =>
      // In the data view, the model <productPreview> corresponds to:
      //
      // <section class="product" data-id="..."></section>
        viewWriter.createEmptyElement('section', {
          class: 'product',
          'data-id': modelElement.getAttribute('id'),
        }),

    })

    // <productPreview> converters (model → editing view)
    conversion.for('editingDowncast').elementToElement({
      model: 'productPreview',
      view: (modelElement: any, { writer: viewWriter }: any) => {
        // In the editing view, the model <productPreview> corresponds to:
        //
        // <section class="product" data-id="...">
        //     <div class="product__react-wrapper">
        //         <ProductPreview /> (React component)
        //     </div>
        // </section>
        const id = modelElement.getAttribute('id')

        // The outermost <section class="product" data-id="..."></section> element.
        const section = viewWriter.createContainerElement('section', {
          class: 'product',
          'data-id': id,
        })

        // The inner <div class="product__react-wrapper"></div> element.
        // This element will host a React <ProductPreview /> component.
        const reactWrapper = viewWriter.createRawElement('div', {
          class: 'product__react-wrapper',
        }, (domElement: any) => {
          // This the place where React renders the actual product preview hosted
          // by a UIElement in the view. You are using a function (renderer) passed as
          // editor.config.products#productRenderer.
          renderProduct(id, domElement)
        })

        viewWriter.insert(viewWriter.createPositionAt(section, 0), reactWrapper)

        return toWidget(section, viewWriter, { label: 'product preview widget' })
      },
    })
  }
}
