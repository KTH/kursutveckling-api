const log = require('kth-node-log')
const libxml = require('libxmljs')
const JSZip = require('jszip')
const fetch = require('node-fetch')

const storageUri = 'https://kursinfostoragestage.blob.core.windows.net/kursutveckling-blob-container/'

module.exports = {
  createPackageStream: _createPackageStream
}

async function _createPackageStream (fragments) {
  log.debug('Build XML in _createPackage with:', fragments)

  const xmlDoc = new libxml.Document()
  const attachmentNames = []

  xmlDoc.node('Kursspecifikation_ver_2').attr({ xmlns: 'Kursspecifikation_ver_3' })
    .node('Identitet', '').parent()
    .node('Beskrivning', 'Kursinformation').parent()
    .node('Pakettyp', 'AIP').parent()
    .node('DatumOchTid', new Date().toLocaleString()).parent()
    .node('Leveranstyp', 'Kursinformation').parent()
    .node('Leveransspecifikation', 'Kursspecifikation_ver_3').parent()
    .node('Leveransoverenskommelse', '').parent()
    .node('ArkivbildareNamn', 'KTH').parent()
    .node('ArkivbildareIdentitetskod', '202100-3054').parent()
    .node('SystemNamn', 'Kursinformationsplatsen').parent()
    .node('LevererandeSystemNamn', 'kursutveckling-arkivering').parent()
    .node('LevererandeSystemVersion', '').parent()
    .node('LevererandeOrganisationNamn', 'KTH').parent()
    .node('Gallring', '0').parent()
    .node('Sekretess', '0').parent()
    .node('Informationsklass', '0').parent()
    .node('Referenskod', '3.4.2').parent()
    .node('SkyddadePersonuppgifter', '0').parent()
    .node('Notering', '').parent()

  fragments.forEach(f => {
    const beforeAttachment = xmlDoc.root().node('Kurs')
      .node('Kurskod', f.courseCode).parent()
      .node('Kursnamn', f.courseName).parent()
      .node('Kursomgang')
      .node('Kursomgangskod', f.courseRound).parent()
      .node('Termin', f.semester).parent()
      .node('Kursomgangomfang', f.analysisName).parent()
      .node('Kursansvarig', f.responsibles).parent()
      .node('Examinator', f.examiners).parent()
      .node('Bevarandehandling')
      .node('Beskrivning', 'Kursanalys').parent()
      .node('Publiceringsdatum', f.publishedDate).parent()
      .node('Bevaras', '1').parent()

    f.attachments.forEach(a => {
      attachmentNames.push(a.fileName)
      beforeAttachment.node('Bilaga')
        .node('Filnamn', a.fileName).parent()
        .node('Anmarkning', a.remarks).parent()
        .node('Expedieringsdatum', a.fileDate).parent()
        .node('TidVersion', a.publishedDate).parent()
    })
  })

  const archivePackage = new JSZip()
  archivePackage.file('sip.xml', xmlDoc.toString())

  await Promise.all(attachmentNames.map(async n => {
    archivePackage.folder('content')
      .file(n, await fetch(`${storageUri}${n}`)
        .then(res => {
          console.log(`${storageUri}${n}`)
          return res.body
        }))
  }))

  return archivePackage.generateNodeStream({ streamFiles: true })
}
