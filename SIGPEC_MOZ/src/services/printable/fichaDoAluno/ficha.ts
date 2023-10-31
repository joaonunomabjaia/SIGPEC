import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'
import { MOHIMAGELOG } from '../../../assets/imageBytes.ts'
import moment from 'moment'

const img = new Image()
img.src = 'data:image/png;base64,' + MOHIMAGELOG

// const logoTitle =
//   'REPÚBLICA DE MOÇAMBIQUE \n MINISTÉRIO DA SAÚDE \n SERVIÇO NACIONAL DE SAÚDE';
const title = 'Escola de Condução Moçambique'
const reportName = 'fichaAluno'
const fileName = reportName.concat('_' + moment())
const halfPageHeight = 297 / 2
const halfPageWidth = 210 / 2

export default {

  async downloadPDF (escola, inscricao, aluno, pagamento) {
    const data = []
    console.log(escola)
    console.log(inscricao)
    console.log(aluno)
    console.log(pagamento)

    // data = this.createArrayOfArrayRow(listaFinal);

    const doc = new JsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 'smart' // or "smart", default is 16
    })

    const headerReport = [
      [
        {
          content: escola.nome,
          styles: { minCellHeight: 20, fontSize: 18, halign: 'center' },
          colSpan: 3,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold'
        },
        {
          content: '',
          styles: { minCellHeight: 20, fontSize: 16, halign: 'center' },
          colSpan: 1,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold'
        }
      ],
      [
        {
          content: 'Contactos: ' + escola.contactoPrincipal + '/' + escola.contactoAlternativo,
          colSpan: 2,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold',
          fontSize: '14'
        },
        {
          content: 'Rua/Av.: ' + escola.endereco,
          colSpan: 1,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold',
          fontSize: '14'
        },
        {
          content: 'Ficha num.:____',
          colSpan: 1,
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold',
          fontSize: '14'
        }
      ],
      [
        {
          content: 'Distrito/Cidade: ' + 'Maputo',
          halign: 'center',
          valign: 'middle',
          fontStyle: 'bold',
          fontSize: '14'
        },
        {
          content: 'NUIT: ' + escola.nuit,
          halign: 'center',
          valign: 'left',
          fontStyle: 'bold',
          fontSize: '14'
        },
        {
          content: 'Email: ' + escola.email,
          halign: 'center',
          valign: 'left',
          fontStyle: 'bold',
          fontSize: '14'
        },
        {
          content: 'Cod. Barras:____',
          halign: 'center',
          valign: 'left',
          fontStyle: 'bold',
          fontSize: '14'
        }
      ]
    ]

    autoTable(doc, {
      //  margin: { top: 10 },
      bodyStyles: {
        halign: 'left',
        valign: 'middle',
        fontSize: 8
      },
      headStyles: {
        halign: 'left',
        valign: 'middle'
      },
      theme: 'grid',
      body: headerReport
    })

    doc.addImage(img, 'png', 20, 15, 17, 17)
    doc.addImage(img, 'png', 173, 15, 17, 17)

    // Linha picotada no meio da pagina
    doc.text('------------------------------------------------------------------------------------------------ ', 16, halfPageHeight)
    autoTable(doc, {
      //  margin: { top: 10 },
      bodyStyles: {
        halign: 'left',
        valign: 'middle',
        fontSize: 8
      },
      headStyles: {
        halign: 'left',
        valign: 'middle'
      },
      theme: 'grid',
      body: headerReport,
      startY: halfPageHeight + 15
    })
    doc.addImage(img, 'png', 20, halfPageHeight + 16, 17, 17)
    doc.addImage(img, 'png', 173, halfPageHeight + 16, 17, 17)

    doc.save('two-by-four.pdf')
  },

  downloadFile (fileName, fileType, blop) {
    const titleFile = fileName + fileType
    createFile(dirEntry, fileName, blob)
    function createFile (dirEntry, fileName, blob) {
      // Creates a new file
      dirEntry.getFile(
        fileName,
        { create: true, exclusive: false },
        function (fileEntry) {
          writeFile(fileEntry, blob)
        },
        onErrorCreateFile
      )
    }

    function writeFile (fileEntry, dataObj) {
      // Create a FileWriter object for our FileEntry
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
          console.log('Successful file write...')
          openFile()
        }

        fileWriter.onerror = function (error) {
          console.log('Failed file write: ' + error)
        }
        fileWriter.write(dataObj)
      })
    }

    function onErrorLoadFs (error) {
      console.log(error)
    }

    function onErrorCreateFile (error) {
      console.log('errorr: ' + error.toString())
    }
    function openFile () {
      const strTitle = titleFile
      console.log('file system 44444: ' + strTitle)
      const folder =
        cordova.file.externalRootDirectory + 'Download/' + strTitle
      console.log('file system 2222: ' + folder)
      const documentURL = decodeURIComponent(folder)
      cordova.plugins.fileOpener2.open(documentURL, 'application/pdf', {
        error: function (e) {
          console.log('file system open3333366: ' + e + documentURL)
        },
        success: function () {}
      })
    }
    // }
  }
}
