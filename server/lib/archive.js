const log = require('kth-node-log')
const libxml = require('libxmljs')
const JSZip = require('jszip')

module.exports = {
  createPackageStream: _createPackageStream
}

function _createPackageStream (fragments) {
  log.debug('Build XML in _createPackage with:', fragments)

  var xmlDoc = new libxml.Document()

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
    xmlDoc.root().node('Kurs')
      .node('Kurskod', f.courseCode).parent()
      .node('Termin', f.semester).parent()
  })

  const archivePackage = new JSZip()
  archivePackage.file('sip.xml', xmlDoc.toString())
  archivePackage.folder('content').file('dummy.pdf', 'Not a real PDF file.')

  return archivePackage.generateNodeStream({ streamFiles: true })

  // xmlDoc.node('Kursspecifikation_ver_2').attr({ xmlns: 'Kursspecifikation_ver_2' })
  //   .node('Identitet', identitet || '').parent()
  //   .node('Beskrivning', 'Examinationsuppgifter_assignments').parent()
  //   .node('Pakettyp', 'AIP').parent()
  //   .node('DatumOchTid', '2019-06-01T00:00:00').parent()
  //   .node('Leveranstyp', 'Kursinformation').parent()
  //   .node('Leveransspecifikation', 'Kursspecifikation_ver_2').parent()
  //   .node('Leveransoverenskommelse', '').parent()
  //   .node('ArkivbildareNamn', 'KTH').parent()
  //   .node('ArkivbildareIdentitetskod', '202100-3054').parent()
  //   .node('SystemNamn', 'Bilda').parent()
  //   .node('LevererandeSystemNamn', '').parent()
  //   .node('LevererandeSystemVersion', '').parent()
  //   .node('LevererandeOrganisationNamn', 'KTH').parent()
  //   .node('Gallring', '0').parent()
  //   .node('Sekretess', '0').parent()
  //   .node('Informationsklass', '0').parent()
  //   .node('Referenskod', '3.4.2').parent()
  //   .node('SkyddadePersonuppgifter', '0').parent()
  //   .node('Notering', 'Beskrivning av arkivpaketet återfinns i separat arkivpaket i detta arkiv som återsöks genom värdet Bilda i element SystemNamn och värdet Kontext i element Notering').parent()
  //   .node('Kurs')
  //   .node('Kurskod', kurskod).parent()
  //   .node('Kursnamn', kursnamn).parent()
  //   .node('Kurstillfalle', kurstillfalle).parent()
  //   .parent()
  //   .node('Bilaga')
  //   .node('Filnamn', filnamn).parent()
  //   .node('Beskrivning', '').parent()
  //   .node('Bevaras', '1').parent()
  //   .node('Tid', tid).parent()
}
